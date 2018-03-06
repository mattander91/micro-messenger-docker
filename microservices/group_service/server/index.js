const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const GroupsModel = require('../database/index.js');
const helpers = require('./helpers.js');

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

// check if the service is running
app.get('/', function(req, res) {
  console.log('Group service is running');
  res.send('GroupService is running')
});



//adds new group
app.post('/group', function(req, res) {
  var groupName = req.body.groupName;
  var groupMongoInstance = new GroupsModel({
    name: groupName
  });
  groupMongoInstance.save(function(err) {
    if (err) {
      console.log('error group name likely exists: ');
      res.sendStatus(500);
    } else {
      console.log('group ' + groupName + ' saved');
      res.sendStatus(201);
    }
  });
});

//gets list of groups
app.get('/getGroups', function(req, res) {
  GroupsModel.find({}, function(err, data) {
    if (err) {
      console.log('error getting /getGroups: ', err);
      req.sendStatus(500);
    } else {
      res.status(200);
      var groupNames = data.map(group => {
        return {groupName: group.name}
      });
      res.send(groupNames);
    }
  });
});



//adds a member to an existing group
app.post('/members', function(req, res) {  //Should this be post?
  var groupName = req.body.groupName;
  var memberObj = {member: req.body.requestedMember, ID: req.body.memberId}
  GroupsModel.update({name: groupName}, {$addToSet: {members: memberObj}}, function(err, data) {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log('new member ' + req.body.requestedMember + ' saved');
      res.sendStatus(201);
    }
  });
});

//removes members from existing group
app.delete('/deleteMembers', function(req, res) {
  var groupName = req.body.groupName;
  var memberId = req.body.memberId;
  GroupsModel.update({name: groupName}, {$pull: {members: {ID: memberId}}}, function(err, data) {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log('member ID ' + memberId + ' removed');
      res.sendStatus(202);
    }
  });
});

//removes group and members
app.delete('/deleteGroup', function(req, res) {
  var groupName = req.body.groupName;
  GroupsModel.remove({name: groupName}, function(err, data) {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log(groupName + ' removed successfully');
      res.sendStatus(202);
    }
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


/*
User action flow to create group:

  1.) User specifies name of group and can send invites to members (optional) on same form
        -Members list needs to come from users who signed up in Authentication Service
        -Post request goes to Group Service to create new service
        -Request goes to Email Notification service to selected members. Email has button that directs user to page allowing them to join newly created group.
        -Creator of group has admin privileges allowing them to delete group and/or delete group and all members.
  2.) If members are not specified on creation page, members can be added in separate form on
      group message page at any time.
        -Members can be searched in form from Authentication Service. As user types, relevant members appear in list below. As member names are clicked, email addresses populate input field (comma separated). Post request sends array of email addresses to Email Notification Service.

*/
