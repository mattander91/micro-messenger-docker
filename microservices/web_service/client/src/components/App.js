import React from 'react';
import $ from 'jquery';
import HandleMessages from './HandleMessages.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import HandleGroup from './HandleGroup.js';
import Login from './Login.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentState: 'Home',
      loggedIn: false,
      currentUser: false,
      currentGroup: '',
      messages: [],
      groups: []
    };

    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.setUser = this.setUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.fetchMessagesFromClick = this.fetchMessagesFromClick.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
    this.deleteMessages = this.deleteMessages.bind(this);
  }

/*###################################*/

  componentDidMount() {
    this.setUser();
    this.fetchGroups();
  }

  fetchMessagesFromClick(groupName) {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:3003/getMessages',
      data: {groupName: groupName},
      success: (fetchedMessages) => {
        this.setState({
          messages: fetchedMessages,
          currentGroup: groupName
        });
      },
      failure: (err) => {
        console.log(err);
      }
    });
  }

  fetchGroups() {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:3002/getGroups',
      success: (data) => {
        this.setState({
          groups: data
        });
      },
      failure: (err) => {
        console.log('error: ', err);
      }
    });
  }

  deleteMessages(groupName) {
    $.ajax({
      type: 'DELETE',
      url: 'http://0.0.0.0:3003/deleteMessages',
      data: {groupName: groupName},
      success: () => {
        this.setState({
          currentGroup: ''
        });
      }
    });
  }


  setUser() {
    this.setState({
      currentUser: sessionStorage.getItem('user')
    });
  }


/*###################################*/

  handleLogout() {
    sessionStorage.removeItem('user');
    this.setState({
      currentUser: ''
    });
  }


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

  render () {
    if (this.state.currentState === 'Home') {
      return (
        <div>
          <div>
            <Home
              handleSignupClick={this.handleSignupClick}
              handleLoginClick={this.handleLoginClick}
              handleLogout={this.handleLogout}
              user={this.state.currentUser}
            />
          </div>
          <div className="left">
            <HandleGroup
              fetchMessagesFromClick={this.fetchMessagesFromClick}
              fetchGroups={this.fetchGroups}
              groups={this.state.groups}
              deleteMessages={this.deleteMessages}
            />
          </div>
          <div className="right">
            <HandleMessages
              user={this.state.currentUser}
              group={this.state.currentGroup}
              messages={this.state.messages}
              fetchMessagesFromClick={this.fetchMessagesFromClick}
              numberOfGroups={this.state.groups.length}
            />
          </div>
        </div>
      )
    }
    if (this.state.currentState === 'signup') {
      return (
        <div>
          <SignUp
            handleHome={this.handleHome}
            setUser={this.setUser}
          />
        </div>
      )
    }
    if (this.state.currentState === 'login') {
      return (
        <div>
          <Login
            handleHome={this.handleHome}
            setUser={this.setUser}
          />
        </div>
      )
    }
  }
}

export default App;