const mongoose = require('mongoose');

const pixelSchema = new mongoose.Schema({
  //TODO: positions must be unique
  pos: [Number, Number],
  color: String,
  owner: String,
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Pixel = mongoose.model('Pixel', pixelSchema);

module.exports = Pixel;
