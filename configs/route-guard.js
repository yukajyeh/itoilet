const checkLogin = (req, res, next) => {
    const user = req.session.user
    if (user) {
        next()
       /* res.render('main', user) */
    } else {
      res.redirect('/');
    }
  };
  module.exports = checkLogin