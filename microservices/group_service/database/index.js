const mongoose = require('mongoose');
let DB_URI = 'mongodb://localhost:27017/micro_groups';

if (process.env.MONGO_DB_URI) {
  DB_URI = process.env.MONGO_DB_URI;
}

mongoose.connect(DB_URI, { useMongoClient: true });

var Groups = mongoose.model(
  'Groups', {
    name: {
      type: String,
      unique: true
    },
    members: [mongoose.Schema.Types.Mixed]
  }
);

module.exports = Groups;

/*
--Alternative schemas--

var Members = mongoose.model(
  'Members', {
    name: String,
    id: {
      type: Number,
      unique: true
    },
    groups: [] //contains group ids
  }
);

var Groups = mongoose.model(
  'Groups', {
    name: String,
    id: {
      type: Number,
      unique: true
    }
  }
);


*/
