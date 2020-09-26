const checkLogin = (req, res, next) => {
    const user = req.session.user
    if (user) {
        next()
    } else {
      req.session.error = 'User Only'
      res.redirect('/');
    }
  };
  module.exports = checkLogin