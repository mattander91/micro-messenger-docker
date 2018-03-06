const express = require('express');
const bodyParser = require('body-parser');

const UsersModel = require('../database/index.js');
const helpers = require('./helpers.js');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

var session = require('express-session');

let app = express();


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000
  }
}));

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let port = 3000;


// check if the service is running
app.get('/', function(req, res) {
  console.log('Auth service is running');
  var username = req.session.user;
  console.log('session user: ', username);
  res.send('Auth service is running')
});

//signs up new member
app.post('/signup', function(req, res) {
  var name = req.body.username;
  var pass = req.body.password;
  var hash = bcrypt.hashSync(pass, salt);
  var newUser = new UsersModel({
    username: name,
    password: hash
  });
  newUser.save(function(err) {
    if (err) {
      console.log('error ' + err);
      res.sendStatus(500);
    } else {
      console.log('user ' + name + ' saved');
      res.sendStatus(202);
    }
  });
});


//logs in user
app.post('/login', function(req, res) {
  var username = req.body.loginUsername;
  var password = req.body.loginPassword;
  UsersModel.findOne({username: username}, function(err, result) {
    if (err) {
      console.log('error: ', err);
    }
    var passwordCompare = result.password;
    bcrypt.compare(password, passwordCompare, function(err, match) {
      if (match) {
        console.log('user found ', match);
        req.session.user = username;
        res.sendStatus(200);
      } else {
        console.log('user not found/invalid credentials');
        res.sendStatus(500);
      }
    });
  });
});

app.post('/logout', function(req, res){
  console.log('session clearing after logout');
  req.session.destroy(function(err){
    if (err){
      console.log('Failed to destroy session');
      res.sendStatus(500);
    }
    else{
      console.log('session destroyed');
      res.sendStatus(202);
    }
  });
});


//removes user
app.delete('/deleteUser', function(req, res) {
  var username = req.body.username;
  UsersModel.remove({username: username}, function(err, data) {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log(username + ' removed successfully');
      res.sendStatus(202);
    }
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
