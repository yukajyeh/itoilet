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




module.exports = router;
