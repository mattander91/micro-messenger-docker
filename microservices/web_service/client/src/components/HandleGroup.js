import React from 'react';
import $ from 'jquery';
import GroupsList from './GroupsList.js';


class HandleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGroup: ''
    }

    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.addNewGroup = this.addNewGroup.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);

  }

  handleAddGroup(e) {
    let newGroup = e.target.value;
    this.setState({
      newGroup: newGroup
    });
  }

  addNewGroup(e) {
    e.preventDefault();
    let newGroup = {
      groupName: this.state.newGroup
    }
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:3002/group',
      data: newGroup,
      success: () => {
        this.props.fetchGroups();
      },
      error: (err) => {
        console.log('GET user messages failed: ', err);
      }
    });
  }

  deleteGroup(groupName) {
    $.ajax({
      type: 'DELETE',
      url: 'http://0.0.0.0:3002/deleteGroup',
      data: {groupName: groupName},
      success: () => {
        this.props.fetchGroups();
      },
      failure: (err) => {
        console.log(err);
      }
    });
  }

  resetForm() {
    document.getElementById("group").reset();
  }

  render() {
    return (
      <div>
        <form className="top" id="group" onSubmit={(event) => {
          this.addNewGroup(event)
          this.resetForm(event)}}>
          <input type="text" placeholder="Add new group..." onChange={(event) => {
            this.handleAddGroup(event)}
          }/>
        </form>
        <GroupsList
          groups={this.props.groups}
          fetchMessagesFromClick={this.props.fetchMessagesFromClick}
          deleteGroup={this.deleteGroup}
          deleteMessages={this.props.deleteMessages}
        />
      </div>
    );
  }

}


export default HandleGroup;