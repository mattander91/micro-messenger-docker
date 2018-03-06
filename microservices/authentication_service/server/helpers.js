const UsersModel = require('../database/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

function signupMember(username, password) {
  var username = username;
  var pass = password;
  var hash = bcrypt.hashSync(pass, salt);
  var newUser = new UsersModel({
    username: username,
    password: hash
  });
  newUser.save(function(err) {
    if (err) {
      console.log('error ' + err);
    } else {
      console.log('user ' + username + ' saved');
    }
  });
};

function deleteMember(username) {
  UsersModel.remove({username: username}, function(err, data) {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log(username + ' removed successfully');
    }
  });
};

function loginMember(username, password) {
  UsersModel.findOne({username: username}, function(err, result) {
    if (err) {
      console.log('error: ', err);
    }
    var passwordCompare = result.password;
    bcrypt.compare(password, passwordCompare, function(err, match) {
      if (match) {
        console.log('user found ', match);
      } else {
        console.log('user not found/invalid credentials');
      }
    });
  });
};

module.exports.signupMember = signupMember;
module.exports.loginMember = loginMember;
module.exports.deleteMember = deleteMember;
