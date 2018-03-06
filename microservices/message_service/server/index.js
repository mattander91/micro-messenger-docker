
const express = require('express');
const bodyParser = require('body-parser');

const MessagesModel = require('../database/index.js');
const helpers = require('./helpers.js');
const cors = require('cors');

let app = express();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let port = 3000;

// test if the service is running
app.get('/', function(req, res) {
  console.log('Message service is running');
  res.send('Message service is running')
});

//adds new message
app.post('/message', function(req, res) {
  console.log('request received: ', req.body);
  var username = req.body.username;
  var message = req.body.message
  var newMessage = new MessagesModel({
    username: username,
    message: message
  });
  newMessage.save(function(err) {
    if (err) {
      console.log('error ' + err);
      res.sendStatus(500);
    } else {
      console.log('message saved');
      res.sendStatus(201);
    }
  });
});

app.get('/getMessages', function(req, res) {
  MessagesModel.find({}, function(err, data) {
    if (err) {
      console.log('error getting /getMessages: ', err);
      req.sendStatus(500);
    } else {
      res.status(200);
      var messages = data.map(message => {
        return {message: message.message}
      });
      res.send(messages);
    }
  });
});


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});