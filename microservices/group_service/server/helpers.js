const GroupsModel = require('../database/index.js');

function addGroup(groupName) {
  var groupMongoInstance = new GroupsModel({
    name: groupName
  });
  groupMongoInstance.save(function(err) {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('saved ' + groupName + ' successfully');
    }
  });
};

function addMember(groupName, memberName, memberId) {
  var memberObj = {member: memberName, ID: memberId};
  GroupsModel.update({name: groupName}, {$addToSet: {members: memberObj}}, function(err, data) {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('new member ' + memberName + ' saved to ' + groupName);
    }
  });
};

function removeMember(groupName, memberId) {
  GroupsModel.update({name: groupName}, {$pull: {members: {ID: memberId}}}, function(err, data) {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('member ID ' + memberId + ' removed');
    }
  });
};

function removeGroupAndMembers(groupName) {
  GroupsModel.remove({name: groupName}, function(err, data) {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log(groupName + ' removed successfully');
    }
  });
};



module.exports.addGroup = addGroup;
module.exports.addMember = addMember;
module.exports.removeMember = removeMember;
module.exports.removeGroupAndMembers = removeGroupAndMembers;
