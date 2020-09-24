const express = require('express')
const router  = express.Router()
const User = require('../models/user-model')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const checkLogin = require('../configs/route-guard');


//create new user 
router.get('/auth/signup', (req, res) => {
  res.render('signup');
});

router.post('/auth/signup', (req, res, next) => {
  const {username, email, password} = req.body
  res.render('signup')

  if (!username || !email || !password) {
    res.render('signup',{errorMessage:'All fields required'});
    return
  }

  bcryptjs
  .genSalt(saltRounds)
  .then(salt => bcryptjs.hash(password, salt))
  .then(hashedPassword => {
    return User.create({
      username,
      email,
      passwordHash: hashedPassword
    });
  })
  .then(user => {
    console.log('New user is: ', user);
  })

  .catch(e => {
   console.log(e)
}) 
})

//LOGIN 
router.post('/auth/login',(req, res, next) => {
  const { username, password } = req.body

  let currentUser

  User.findOne({username})
  .then(user => {
    if(user){
      currentUser = user
      return bcryptjs.compare(password, user.passwordHash)
    }
  })

  .then(result => {
    if(!result){
      res.render('index', {errorMessage:'Login unsuccessful'})
    } else{
      req.session.user = currentUser
      res.redirect('/main')
    }
  })
  .catch(e => console.log(e))
})

//AFTER-LOGIN UNLOCK THE MAP
router.get('/main', checkLogin, (req, res)=> {
  const user = req.session.user
  res.render('main', user)
})


//USER PROFILE
router.get('/auth/profile', checkLogin, (req, res) => {
  const user = req.session.user
  res.render('user-profile', user)
})

//LOGOUT
router.get('/auth/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});





 
module.exports = router;