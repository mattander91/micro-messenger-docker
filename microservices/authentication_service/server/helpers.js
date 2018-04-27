const UsersModel = require('../database/index.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let signupMember = (username, password) => {
  let pass = password;
  let hash = bcrypt.hashSync(pass, salt);
  let newUser = new UsersModel({
    username: username,
    password: hash
  });
  newUser.save(err => {
    if (err) {
      console.log('error ' + err);
    } else {
      console.log('user ' + username + ' saved');
    }
  });
};

let deleteMember = (username) => {
  UsersModel.remove({username: username}, (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log(username + ' removed successfully');
    }
  });
};

let loginMember = (username, password) => {
  UsersModel.findOne({username: username}, (err, result) => {
    if (err) {
      console.log('error: ', err);
    }
    let passwordCompare = result.password;
    bcrypt.compare(password, passwordCompare, (err, match) => {
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
