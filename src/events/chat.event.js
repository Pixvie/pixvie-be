module.exports = (io, socket) => {
    const getMessage = async (payload) => {
        console.log(payload);
        io.emit("SEND_MESSAGE", payload);
    }
  
    socket.on("CHAT_MESSAGE", getMessage);
  }