const User = require('../models/user.model');

module.exports = (io, socket) => {
  const playerList = async () => {
    const sockets = io.sockets.sockets;
    const filteredSocketList = {};
    sockets.forEach((value, key) => {
      const data = JSON.parse(value.handshake.query?.user);
      filteredSocketList[key] = {
        ip: value.handshake.address,
        socketId: key,
        username: data.username,
        userID: data.id,
      };
    });
    return filteredSocketList;
  };

  const chatCommandHandler = async (message) => {
    const [command, ...params] = message.split(' ');
    const pl = await playerList();
    switch (command) {
      case '/clear':
        io.emit('CLEAR_CHAT');
        break;
      case '/kick':
        io.emit('FORCE_DISCONNECT', params[0]);
        break;
      case '/warn':
        io.emit('WARN', {
          username: params[0],
          message: params[1],
        });
        break;
      case '/list':
        socket.emit('LIST_PLAYER', pl);
        break;
      default:
        break;
    }
  };

  const getMessage = async (payload) => {
    const { message } = payload;
    const { id: userID, username } = payload.user;
    let newMessage = `${username}: ${message}`;

    if (message.startsWith('/')) {
      if (!userID) return;
      const { role } = await User.findById(userID);
      if (role === 'ADMIN') chatCommandHandler(message);
      return;
    }

    io.emit('SEND_MESSAGE', newMessage);
  };

  const handleModeration = async (payload) => {
    const { status, message } = payload;
    switch (status) {
      case 'SELF_DISCONNECT':
        socket.emit('SEND_MESSAGE', 'SERVER: You kicked from the session.');
        socket.disconnect(true);
        break;
      case 'CHAT_WARN':
        socket.emit('SEND_MESSAGE', `SERVER: ${message}`);
        break;
      default:
        break;
    }
  };

  socket.on('HANDLE_MODERATION', handleModeration);
  socket.on('CHAT_MESSAGE', getMessage);
};
