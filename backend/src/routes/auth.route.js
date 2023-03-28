// routes/auth.js
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const authController = require('../controllers/auth.controller');

const requireSignin = passport.authenticate('local', { session: false });

/* POST login. */
router.post('/login', requireSignin, sayHi);

module.exports = router;

function sayHi(req, res) {
  console.log(231231);
  res.send('heyyyy');
}
