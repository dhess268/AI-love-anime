const auth = require('../services/auth.service');

async function login(req, res, next) {
  try {
    console.log(req);
    return await auth.login(req.body.username, req.body.password, res);
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
