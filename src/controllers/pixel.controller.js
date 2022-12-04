const Pixel = require('../models/pixel.model');

const getPixelBoard = async (req, res) => {
  try {
    const pixelBoard = await Pixel.find();
    res.status(200).json(pixelBoard);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPixel = async (req, res) => {
  const { x, y, color } = req.body;
  // const findPixel = await Pixel.findOne({ pos: [x, y] });
  const newPixel = new Pixel({ pos: [x, y], color });
  try {
    await newPixel.save();
    res.status(201).json(newPixel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  // if (findPixel) {
  //   res.status(409).json({ message: 'Pixel already exists' });
  // } else {
  //   const newPixel = new Pixel({ pos: [x, y], color });
  //   try {
  //     await newPixel.save();
  //     res.status(201).json(newPixel);
  //   } catch (error) {
  //     res.status(409).json({ message: error.message });
  //   }
  // }
};

module.exports = {
  getPixelBoard,
  createPixel,
};
