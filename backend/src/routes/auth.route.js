// routes/auth.js
const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const authController = require('../controllers/auth.controller');

/* POST login. */
router.post('/login', authController.login);

module.exports = router;
