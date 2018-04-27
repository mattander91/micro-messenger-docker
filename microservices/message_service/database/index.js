const mongoose = require('mongoose');
let DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/micro_messages';

mongoose.connect(DB_URI, { useMongoClient: true });

let Messages = mongoose.model(
  'Messages', {
    group: String,
    messages: [mongoose.Schema.Types.Mixed]
  }
);

module.exports = Messages;
