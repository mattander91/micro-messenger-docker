const mongoose = require('mongoose');
let DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/micro_users';

mongoose.connect(DB_URI, { useMongoClient: true });

let Users = mongoose.model(
  'Users', {
    username: {
      type: String,
      unique: true
    },
    password: String
  }
);

module.exports = Users;
