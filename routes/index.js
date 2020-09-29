const express = require('express');
const { registerPartials } = require('hbs');
const router  = express.Router();
const Toilet = require('../models/toilet-info')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//toilet API Information
router.get('/toilets/api',(req, res, next) => {
  Toilet.find()
  .then(toilets => {
    res.send(toilets)
  })
  .catch((e)=> {
    console.log(e)
  })
})

router.post('/toilets/api', (req, res) => {
  const { name, price, childFriendly, location, hours } = req.body

  const newToilet= {
    location_name: name, 
    price_per_use: price,
    child_friendly: childFriendly,
    location: location,
    openings_time: hours
  } 

  

  Toilet.create(newToilet) 
    .then(() =>{
      res.render('add-toilet', {name, price, childFriendly, location, hours})
     //res.redirect('/')
    })
    .catch((e) => {
      console.log(e)
    })

})




module.exports = router;
