const GroupsModel = require('../database/index.js');

let addGroup = (groupName) => {
  let groupMongoInstance = new GroupsModel({
    name: groupName
  });
  groupMongoInstance.save(err => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('saved ' + groupName + ' successfully');
    }
  });
};

let addMember = (groupName, memberName, memberId) => {
  let memberObj = {member: memberName, ID: memberId};
  GroupsModel.update({name: groupName}, {$addToSet: {members: memberObj}}, (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('new member ' + memberName + ' saved to ' + groupName);
    }
  });
};

let removeMember = (groupName, memberId) => {
  GroupsModel.update({name: groupName}, {$pull: {members: {ID: memberId}}}, (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      console.log('member ID ' + memberId + ' removed');
    }
  });
};

let removeGroupAndMembers = (groupName) => {
  GroupsModel.remove({name: groupName}, (err, data) => {
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
