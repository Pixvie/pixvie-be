const Pixel = require('../models/pixel.model');

module.exports = (io, socket) => {
  const drawPixel = async (payload) => {
    try {
      const findPixel = await Pixel.findOne({ pos: [payload.x, payload.y] });
      if (!findPixel) {
        const newPixel = new Pixel({ pos: [payload.x, payload.y], color: payload.color, owner: payload.username });
        await newPixel.save();
      } else {
        findPixel.color = payload.color;
        findPixel.owner = payload.username;
        await findPixel.save();
      }
    } catch (error) {
      console.log(error);
    }
    socket.broadcast.emit('DRAWED_PIXEL', payload);
  };

  socket.on('DRAW_PIXEL', drawPixel);
};
