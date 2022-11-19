const mongoose = require('mongoose');

let connectionURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/kesyBase';

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ [DB] - successfully connected to database.');
  })
  .catch((error) => {
    console.log('💢 [DB]- something went wrong while connecting.' + error.message);
  });
