const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../services/auth.service');

async function login(req, res, next) {
  try {
    auth.login(req.body.username, req.body.password);
  } catch (err) {
    console.error(`Error while logging in`, err.message);
    next(err);
  }
}

module.exports = {
  login,
};
