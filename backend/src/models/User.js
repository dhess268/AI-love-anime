const mongoose = require('mongoose');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const { Anime } = require('./Anime');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: false },
  anime: { type: [Anime] },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.createToken = function () {
  return jwt.sign({ _id: this._id }, keys.JWT_SECRET);
};

UserSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: `JWT ${this.createToken()}`,
  };
};

module.exports = mongoose.model('User', UserSchema);
