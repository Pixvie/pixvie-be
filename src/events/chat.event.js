module.exports = (io, socket) => {
    const getMessage = async (payload) => {
        io.emit("SEND_MESSAGE", payload);
    }
  
    socket.on("CHAT_MESSAGE", getMessage);
  }