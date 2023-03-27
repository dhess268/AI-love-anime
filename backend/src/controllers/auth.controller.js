const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../services/auth.service');

async function login(req, res, next) {
  try {
    // return res.status(200).send('all good');
    // await auth.login(req.body.username, req.body.password, res);
    await passport.authenticate(
      'local',
      { session: false },
      (err, user, info) => {
        console.log('inside authenticate');
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
      }
    );
  } catch (err) {
    if (req.body?.username || req.body?.password) {
      res.status(401);
    } else {
      res.status(400);
    }
    console.error(`Error while logging in`, err.message);
    next(err);
  }
}

module.exports = {
  login,
};
