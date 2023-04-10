// routes/auth.js
const express = require('express');

const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');

const requireSignin = passport.authenticate('local', { session: false });

/* POST login. */
router.post('/login', requireSignin, authController.loginUser);

// test route
// router.get('/login', sayHi);

router.post('/register', authController.createUser);

// function sayHi(req, res) {
//   res.send('hihi');
// }

module.exports = router;
