module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: 86400 * 1,
  OPENAI_KEY: process.env.OPENAI_KEY,
};
