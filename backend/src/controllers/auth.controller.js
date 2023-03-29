const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');

async function loginUser(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      status: 'failure',
      user: req.user,
    });
  }
  // generate a signed son web token with the contents of user object and return it in the response
  const token = jwt.sign(req.user.toJSON(), keys.JWT_SECRET, {
    expiresIn: keys.JWT_EXPIRES_IN,
  });

  const userSafeToReturn = {
    id: req.user.id,
    email: req.user.email,
    avatar: req.user.avatar,
  };

  return res.json({
    status: 'success',
    token,
    user: userSafeToReturn,
  });
}

module.exports = {
  loginUser,
};
