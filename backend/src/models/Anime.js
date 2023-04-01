const mongoose = require('mongoose');

const { Schema } = mongoose;

const AnimeSchema = new Schema({
  malId: { type: Number, required: true },
  title: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model('Anime', AnimeSchema);
