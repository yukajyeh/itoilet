const express = require('express')
const router  = express.Router()
const User = require('../models/user-model')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
 

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const {username, email, password} = req.body
  res.render('signup')
  console.log(req.body)

  if (!username || !email || !password) {
    res.render('signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(500)
      .render('/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  bcryptjs
  .genSalt(saltRounds)
  .then(saltsalt => bcryptjs.hash(password, salt))
  .then(hashedPassword => {
    return User.create({
      username,
      email,
      passwordHash: hashedPassword
    });
  })
  .then(userFromDB => {
    console.log('Newly created user is: ', userFromDB);
    res.redirect('/signup');
  })

  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render('/signup', { errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render('/signup', {
        errorMessage: 'Username need to be unique. Either username or email is already used.'
      });
    } else {
      next(error);
    }
  });
  
})
 
module.exports = router;