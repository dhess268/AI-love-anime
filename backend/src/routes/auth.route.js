// routes/auth.js
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const authController = require('../controllers/auth.controller');

const requireSignin = passport.authenticate(
  'local',
  { session: false },
  (err, user, info) => {
    console.log(info);
    authController.login();
  }
);

/* POST login. */
router.post('/login', (req, res, next) => {
  authController.login(req, res, next);
});

router.get('/login', sayHi);

function sayHi(req, res) {
  res.send('hihi');
}

module.exports = router;
