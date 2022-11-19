require('dotenv').config();
const express = require('express');

//Routes files
const auth = require('./routes/auth');

require('./connection.js');
const app = express();
const port = 3000;

app.use('/api/auth', auth);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`🌊 [Server] - Listening on ${port}`);
});
