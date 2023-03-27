const passport = require('passport');
const jwt = require('jsonwebtoken');

async function login(username, password, req, res) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return err;
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'helloworld');
      return res.json({ user, token });
    });
  });
}

module.exports = {
  login,
};
