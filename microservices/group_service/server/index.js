const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const GroupsModel = require('../database/index.js');
const helpers = require('./helpers.js');

let app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 3002;

// check if the service is running
app.get('/', (req, res) => {
  console.log('Group service is running');
  res.send('GroupService is running')
});



//adds new group
app.post('/group', (req, res) => {
  let groupName = req.body.groupName;
  let groupMongoInstance = new GroupsModel({
    name: groupName
  });
  groupMongoInstance.save(err => {
    if (err) {
      console.log('error group name likely exists: ');
      res.sendStatus(500);
    } else {
      console.log('group ' + groupName + ' saved');
      res.sendStatus(202);
    }
  });
});

//gets list of groups
app.get('/getGroups', (req, res) => {
  GroupsModel.find({}, (err, data) => {
    if (err) {
      console.log('error getting /getGroups: ', err);
      req.sendStatus(500);
    } else {
      res.status(200);
      let groupNames = data.map(group => {
        return {groupName: group.name}
      });
      res.send(groupNames);
    }
  });
});

//removes group
app.delete('/deleteGroup', (req, res) => {
  let groupName = req.body.groupName;
  GroupsModel.remove({name: groupName}, (err, data) => {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log(groupName + ' removed successfully');
      res.sendStatus(202);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
