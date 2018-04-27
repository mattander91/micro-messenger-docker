const MessagesModel = require('../database/index.js');

let addMessage = (username, message) => {
  let newMessage = new MessagesModel({
    username: username,
    message: message
  });
  newMessage.save(err => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('saved message');
    }
  });
};

module.exports.addMessage = addMessage;