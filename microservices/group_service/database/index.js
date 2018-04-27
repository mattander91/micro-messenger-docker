const mongoose = require('mongoose');
let DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/micro_groups';


mongoose.connect(DB_URI, { useMongoClient: true });

let Groups = mongoose.model(
  'Groups', {
    name: {
      type: String,
      unique: true
    }
  }
);

module.exports = Groups;