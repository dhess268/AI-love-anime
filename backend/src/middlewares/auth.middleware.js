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
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
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
