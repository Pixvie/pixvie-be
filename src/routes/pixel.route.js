const express = require('express');
const router = express.Router();

const { getPixelBoard } = require('../controllers/pixel.controller');

router.get('/', getPixelBoard);
//router.post('/', createPixel);

module.exports = router;
