const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pokedexNum: { type: Number, required: true },
  types: { type: Array },
  imageUrl: { type: String },
  userId: { type: String },
});

module.exports = Card = mongoose.model(`card`, cardSchema);
