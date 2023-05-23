require('dotenv').config();

// Dependencies
const { Server } = require('socket.io');
const cors = require('cors');
const express = require('express');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const volleyball = require('volleyball');
// Routes files
const auth = require('./routes/auth.route');
const board = require('./routes/pixel.route');

require('./connection.js'); // Database connection
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: '/socket',
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});
const port = process.env.PORT || 3000;

//TODO: error handling
// Middlewares
app.use(cors());
app.use(express.json());
app.use(volleyball);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(require('./utils/middlewares/passport.middleware'));

// Routes
app.use('/auth', auth);
app.use('/board', board);

app.get('/', (req, res) => {
  res.send('Welcomo to backend service of Pixvie!');
});

// Socket.io
const registerDrawingHandler = require('./events/drawing.event');
const registerChatHandler = require('./events/chat.event');
const registerDisconnectHandler = require('./events/disconnect.event');
const onConnection = (socket) => {
  let totalPlayerCount = io.engine.clientsCount;
  io.emit('TOTAL_PLAYER', totalPlayerCount);

  registerDrawingHandler(io, socket);
  registerChatHandler(io, socket);
  registerDisconnectHandler(io, socket);
};

io.on('connection', onConnection);

server.listen(port, () => {
  console.log(`🌊 [Server] - Listening on ${port}`);
});
