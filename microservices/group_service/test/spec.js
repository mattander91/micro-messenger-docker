const assert = require('chai').assert;
const request = require('request');
const expect = require('chai').expect;
const helpers = require('../server/helpers.js');
const GroupsModel = require('../database/index.js');

describe('server', function() {

  it('should accept POST requests to /group', function(done) {
    var requestParams = {
      method: 'POST',
      uri: 'http://127.0.0.1:3000/group',
      json: {
        groupName: 'RPT-01'
      }
    };
    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });


  it('should add unique group names', function(done) {
    var newGroupName = 'RPT-01';
    var requestParams = {
      method: 'POST',
      uri: 'http://127.0.0.1:3000/group',
      json: {
        groupName: newGroupName
      }
    };
    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(500);
      done();
    });
  });


  it('should accept POST requests to /members', function(done) {
    var newMemberParams = {
      method: 'POST',
      uri: 'http://127.0.0.1:3000/members',
      json: {
        groupName: 'RPT-01',
        requestedMember: 'Matt',
        memberId: '1'
      }
    }
    request(newMemberParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });


  it('should add members to existing group', function(done) {
    var groupName = 'RPT-01';
    var newMember = 'Asha'
    var newMemberParams = {
      method: 'POST',
      uri: 'http://127.0.0.1:3000/members',
      json: {
        groupName: groupName,
        requestedMember: newMember,
        memberId: '2'
      }
    }
    request(newMemberParams, function(error, response, body) {
      if (response.statusCode === 201) {
        GroupsModel.find({name: groupName}, function(err, data) {
          if (err) {
            console.log('error on test');
          } else {
            var addedMember = data[0].members.filter(function(member) {
              return member.member === newMember;
            });
            helpers.removeGroupAndMembers(groupName);
            expect(addedMember[0].member).to.equal('Asha');
            done();
          }
        });
      }
    });
  });

});



