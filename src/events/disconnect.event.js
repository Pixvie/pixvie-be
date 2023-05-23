module.exports = (io, socket) => {
  const totalPlayerCount = async () => {
    let totalPlayerCount = io.engine.clientsCount;
    io.emit('TOTAL_PLAYER', totalPlayerCount);
  };

  socket.on('disconnect', totalPlayerCount);
};
