import React from 'react';
import $ from 'jquery';
import Messages from './Messages.js';
import GroupsList from './GroupsList.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import About from './About.js';
import AddGroup from './AddGroup.js';
import Login from './Login.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentState: 'Home',
      message: '',
      messages: [],
      groups: [],
      newUserName: '',
      newPassword: '',
      newGroup: '',
      loginUsername: '',
      loginPassword: ''
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.addNewGroup = this.addNewGroup.bind(this);
    this.handleLoginUsername = this.handleLoginUsername.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

/*###################################*/

  componentDidMount() {
    console.log('groups: ', this.state.groups);
    this.fetchGroups();
    this.fetchMessages();
  }

  fetchGroups() {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:3003/getGroups',
      success: (data) => {
        console.log('fetchGroups called');
        this.setState({
          groups: data
        });
      },
      failure: (err) => {
        console.log('error: ', err);
      }
    });
  }

  fetchMessages() {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:3004/getMessages',
      success: (data) => {
        this.setState({
          messages: data
        });
      },
      failure: (err) => {
        console.log(err);
      }
    });
  }

/*###################################*/

  handleNewUsername(e) {
    var newUserName = e.target.value;
    this.setState({
      newUserName: newUserName
    });
  }

  handleNewPassword(e) {
    var newPassword = e.target.value;
    this.setState({
      newPassword: newPassword
    });
  }

  signupNewUser(e) {
    e.preventDefault();
    var newUser = {
      username: this.state.newUserName,
      password: this.state.newPassword
    }
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:3001/signUp',
      data: newUser,
      success: () => {
        this.setState({
          currentState: 'Home'
        });
      },
      error: (err) => {
        console.log('GET user messages failed: ', err);
      }
    });
  }

/*###################################*/

  handleAddGroup(e) {
    var newGroup = e.target.value;
    this.setState({
      newGroup: newGroup
    });
  }

  addNewGroup(e) {
    e.preventDefault();
    var newGroup = {
      groupName: this.state.newGroup
    }
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:3003/group',
      data: newGroup,
      success: () => {
        console.log('addNewGroup called');
        this.fetchGroups();
      },
      error: (err) => {
        console.log('GET user messages failed: ', err);
      }
    });
  }

/*###################################*/

  handleSignupClick() {
    this.setState({
      currentState: 'signup'
    });
  }

  handleLoginClick() {
    this.setState({
      currentState: 'login'
    });
  }

  handleHome() {
    this.setState({
      currentState: 'Home'
    });
  }

/*###################################*/

  handleMessageChange(e) {
    var message = e.target.value;
    this.setState({
      message: message
    });
  }

  submitMessage(e) {
    e.preventDefault();
    var messageObj = {
      message: this.state.message
    }
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:3004/message',
      data: messageObj,
      success: (data) => {
        console.log('POST successful');
        this.fetchMessages();
      },
      error: (err) => {
        console.log('POST failed');
      }
    })
  }

/*###################################*/

  handleLoginUsername(e) {
    var username = e.target.value;
    this.setState({
      loginUsername: username
    });
  }

  handleLoginPassword(e) {
    var password = e.target.value;
    this.setState({
      loginPassword: password
    });
  }

  loginUser(e) {
    e.preventDefault();
    var user = {
      loginUsername: this.state.loginUsername,
      loginPassword: this.state.loginPassword
    }
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:3001/login',
      data: user,
      success: () => {
        this.setState({
          currentState: 'Home'
        });
      },
      error: (err) => {
        console.log('loginUser failed: ', err);
      }
    });
  }

/*###################################*/

  render () {
    if (this.state.currentState === 'Home') {
      return (
        <div>
          <Home
            handleSignupClick={this.handleSignupClick}
            handleLoginClick={this.handleLoginClick}
          />
          <AddGroup
            handleAddGroup={this.handleAddGroup}
            addNewGroup={this.addNewGroup}
          />
          <GroupsList
            groups={this.state.groups}
          />
          <Messages
            handleMessageChange={this.handleMessageChange}
            submitMessage={this.submitMessage}
            messages={this.state.messages}
          />
        </div>
      )
    }
    if (this.state.currentState === 'signup') {
      return (
        <div>
          <SignUp
            handleNewUsername={this.handleNewUsername}
            handleNewPassword={this.handleNewPassword}
            signupNewUser={this.signupNewUser}
          />
        </div>
      )
    }
    if (this.state.currentState === 'login') {
      return (
        <div>
          <Login
            handleLoginUsername={this.handleLoginUsername}
            handleLoginPassword={this.handleLoginPassword}
            loginUser={this.loginUser}
          />
        </div>
      )
    }
    if (this.state.currentState === 'About') {
      return (
        <div>
          <About
            homeClick={this.handleHome}
          />
        </div>
      )
    }
  }
}

export default App;