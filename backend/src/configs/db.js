const mongoose = require('mongoose');
require('dotenv').config();
// const mongoConnection = process.env.ATLAS_URI
const keys = require('./keys');

mongoose.set('strictQuery', true);

const connectDB = async () => {
  console.log(process.env.MONGODB_URL);
  try {
    mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
