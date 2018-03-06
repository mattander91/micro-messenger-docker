const mongoose = require('mongoose');
let DB_URI = 'mongodb://localhost:27017/micro_messages';

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

mongoose.connect(DB_URI, { useMongoClient: true });


var Messages = mongoose.model(
  'Messages', {
    username: String,
    message: String
  }
);

module.exports = Messages;
