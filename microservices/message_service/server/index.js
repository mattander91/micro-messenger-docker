
const express = require('express');
const bodyParser = require('body-parser');

const MessagesModel = require('../database/index.js');
const helpers = require('./helpers.js');
const cors = require('cors');

let app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let port = process.env.PORT || 3003;

// test if the service is running
app.get('/', (req, res) => {
  console.log('Message service is running');
  res.send('Message service is running')
});


//adds new message
app.post('/message', (req, res) => {
  let group = req.body.group;
  let messageObj = {user: req.body.username, message: req.body.message}
  MessagesModel.findOne({group: group}, (err, data) => {
    if (err) {
      console.log('error on message post: ', err);
      res.sendStatus(500);
    } else if (!data) {
      let newMessage = new MessagesModel({
        group: group,
        messages: messageObj
      });
      newMessage.save(err => {
        if (err) {
          console.log('error saving new collection: ', err);
          res.sendStatus(500);
        } else {
          console.log('new collection saved');
          res.sendStatus(201);
        }
      });
    } else {
      MessagesModel.update({group: group}, {$addToSet: {messages: messageObj}}, (err, data) => {
        if (err) {
          console.log('error updating collection: ', err);
        } else {
          console.log('collection updated');
          res.sendStatus(201);
        }
      });
    }
  });
});


app.get('/getMessages', (req, res) => {
  MessagesModel.findOne({group: req.query.groupName}, (err, data) => {
    if (err) {
      console.log('error getting /getMessages: ', err);
      req.sendStatus(500);
    } else if (data) {
      res.status(200);
      let messages = data.messages.map(message => {
        return {
          message: message.message,
          username: message.user
        }
      });
      res.send(messages);
    } else {
      res.status(200);
      res.send([]);
    }
  });
});


app.delete('/deleteMessages', (req, res) => {
  let groupName = req.body.groupName;
  MessagesModel.remove({group: groupName}, (err, data) => {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log('messages in ' + groupName + ' removed successfully');
      res.sendStatus(202);
    }
  });
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});