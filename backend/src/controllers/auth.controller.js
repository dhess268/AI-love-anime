const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require('../services/auth.service');

async function login(req, res, next) {
  console.log('hey');
}

module.exports = {
  login,
};
