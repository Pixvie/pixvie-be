require('dotenv').config();
const { Server } = require("socket.io");
const express = require('express');
const http = require('http');


//Routes files
const auth = require('./routes/auth');

require('./connection.js');
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin:"*",
    methods:["GET", "POST", "OPTIONS"]
  }
});
const port = process.env.PORT || 3000;

app.use('/api/auth', auth);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  socket.on('DRAW_PIXEL', (payload) => {
    console.log(socket.id, payload)
    socket.broadcast.emit("DRAWED_PIXEL", payload);
  })

});

server.listen(port, () => {
  console.log(`🌊 [Server] - Listening on ${port}`);
});
