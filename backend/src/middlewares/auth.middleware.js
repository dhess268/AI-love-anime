// Use this for authentication (JWT strategy?)
// passport.js

const passport = require('passport');
const passportJWT = require('passport-jwt');
const passportLocal = require('passport-local');

const keys = require('../configs/keys');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../models/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, cb) => {
      User.findOne({ username, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, {
              message: 'Incorrect username or password.',
            });
          }
          return cb(null, user, { message: 'Logged In Successfully' });
        })
        .catch((err) => cb(err));
    }
    // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: keys.JWT_SECRET,
    },
    (jwtPayload, cb) =>
      // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      User.findOneById(jwtPayload.id)
        .then((user) => cb(null, user))
        .catch((err) => cb(err))
  )
);
