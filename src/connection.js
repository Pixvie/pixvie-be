const mongoose = require('mongoose');

let connectionURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/kesyBase';
try {
  mongoose.connect(connectionURL);
  console.log('✅ [DB] - successfully connected to database.');
} catch (error) {
  console.log('💢 [DB]- something went wrong while connecting.' + error.message);
}
