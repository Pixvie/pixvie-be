require('dotenv').config();

// Dependencies
const { Server } = require('socket.io');
const cors = require('cors');
const express = require('express');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// Routes files
const auth = require('./routes/auth.route');
const board = require('./routes/pixel.route');

require('./connection.js'); // Database connection
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(require('./utils/middlewares/passport.middleware'));

// Routes
app.use('/auth', auth);
app.use('/board', board);

app.get('/sa', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Hello User!');
});

app.get('/', (req, res) => {
  res.send('Welcomo to backend service of Pixvie!');
});

// Socket.io
const Pixel = require('./models/pixel.model');
io.on('connection', (socket) => {
  console.log('🌊 [Server] - A user connected');
  socket.on('DRAW_PIXEL', async (payload) => {
    try {
      const findPixel = await Pixel.findOne({ pos: [payload.x, payload.y] });
      if (!findPixel) {
        const newPixel = new Pixel({ pos: [payload.x, payload.y], color: payload.color });
        await newPixel.save();
      }
    } catch (error) {
      console.log(error);
    }
    socket.broadcast.emit('DRAWED_PIXEL', payload);
  });
});

server.listen(port, () => {
  console.log(`🌊 [Server] - Listening on ${port}`);
});
