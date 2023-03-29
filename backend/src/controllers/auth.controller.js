const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const utils = require('../utils/helper.util');
const User = require('../models/User');

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

async function createUser(req, res, next) {
  // validate frontend input
  const { email, username, password } = req.body;

  if (!utils.validateRegistrationInputs(email, username, password)) {
    res.status(400).send({ status: 'failure' });
  }

  // email must be unique. I decided not to sent this to an alternate function for lower initial development time. It was easier to debug in the same function like this.
  const duplicateEmail = await User.findOne({ email }).then((user) => user);

  if (duplicateEmail) {
    return res.status(409).send({ status: 'failure' });
  }

  // create new user document from schema
  const newUser = new User({ email, username });

  // call password creation function from model
  newUser.setPassword(password);

  // save to database
  newUser
    .save()
    .then(() =>
      // return 201 if successful
      res.status(201).send({ status: 'success' })
    )
    .catch((err) => {
      res.status(500).send({ status: 'failureInCreation?' });
    });
}

module.exports = {
  loginUser,
  createUser,
};
