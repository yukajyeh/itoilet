const { default: Axios } = require('axios');
const express = require('express');
const { registerPartials } = require('hbs');
const router  = express.Router();
const Toilet = require('../models/toilet-info')
const uploadCloud = require('../configs/cloudinary');
const checkLogin = require('../configs/route-guard');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//load toilet API Information
router.get('/toilets',(req, res, next) => {
  Toilet.find()
  .then(toilets => {
    res.send(toilets)
  })
  .catch((e)=> {
    console.log(e)
  })
})


//upload new toilet info
router.post('/toilets/api', uploadCloud.single('pic'), async (req, res) => {
 const { name, price, child, location, opening } = req.body

 const geoGoogle = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBoLQ3grbW1KRos1zO_9DaKxsZs7I8y7AM`
  
 try{

 const result = await Axios.get(geoGoogle)
 
  let toiletLocation = result.data.results
  let lng = toiletLocation[0].geometry.location.lng
  let lat = toiletLocation[0].geometry.location.lat
  let type = toiletLocation[0].geometry.location_type 
  let childFriendly = child ? true : false
 
  let newToilet= {
    imageUrl: req.file.path,
    location_name: name, 
    price_per_use: price,
    child_friendly: childFriendly,
    location:{
      type:  type, 
      coordinates: [lng, lat]
  },
    openings_time: opening
  } 

    res.render('confirm-toilet', newToilet)

} catch(e){

    console.log(e)

}
})





module.exports = router;
