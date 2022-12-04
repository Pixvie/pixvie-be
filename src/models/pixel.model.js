const mongoose = require('mongoose');

const pixelSchema = new mongoose.Schema({
  //TODO: positions must be unique
  pos: [Number, Number],
  color: String,
});

const Pixel = mongoose.model('Pixel', pixelSchema);

module.exports = Pixel;
