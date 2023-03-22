// routes/auth.js
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const auth = require('../controllers/auth.controller');

/* POST login. */
router.post('/login', (req, res, next) => {
  auth.login(req);
});

module.exports = router;
