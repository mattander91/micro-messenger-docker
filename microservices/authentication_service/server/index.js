const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const UsersModel = require('../database/index.js');
const helpers = require('./helpers.js');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

let app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 3001;

// check if the service is running
app.get('/', (req, res) => {
  res.status(200);
  console.log('authentication running');
  res.send('authentication service running');
});


//signs up new member
app.post('/signup', (req, res) => {
  let name = req.body.username;
  let pass = req.body.password;
  let hash = bcrypt.hashSync(pass, salt);
  let newUser = new UsersModel({
    username: name,
    password: hash
  });
  newUser.save(err => {
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
app.post('/login', (req, res) => {
  let username = req.body.loginUsername;
  let password = req.body.loginPassword;
  UsersModel.findOne({username: username}, (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      let passwordCompare = data.password;
      bcrypt.compare(password, passwordCompare, (err, match) => {
        if (match) {
          console.log('match: ', match);
          res.sendStatus(201);
        } else {
          console.log('user not found/invalid credentials');
          res.sendStatus(500);
        }
      });
    }
  });
});



app.post('/logout', (req, res) => {
  req.session.destroy(err => {
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
app.delete('/deleteUser', (req, res) => {
  let username = req.body.username;
  UsersModel.remove({username: username}, (err, data) => {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log(username + ' removed successfully');
      res.sendStatus(202);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
