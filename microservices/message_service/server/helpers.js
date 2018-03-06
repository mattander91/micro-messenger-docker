const MessagesModel = require('../database/index.js');

function addMessage(username, message) {
  var newMessage = new MessagesModel({
    username: username,
    message: message
  });
  newMessage.save(function(err) {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('saved message');
    }
  });
};

module.exports.addMessage = addMessage;