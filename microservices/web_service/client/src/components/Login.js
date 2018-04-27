import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: '',
      loginPassword: ''
    }
    this.handleLoginUsername = this.handleLoginUsername.bind(this);
    this.handleLoginPassword = this.handleLoginPassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }


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
      url: 'http://127.0.0.1:3001/login',
      data: user,
      success: () => {
        sessionStorage.setItem('user', this.state.loginUsername);
        this.props.handleHome();
        this.props.setUser();
      },
      error: (err) => {
        console.log('loginUser failed: ', err);
      }
    });
  }

  render() {
    return (
      <div className="accountForm">
        <form onSubmit={this.loginUser}>
          <p>Enter Username: </p>
          <input onChange={(event) => {
            this.handleLoginUsername(event)}
          }/>
          <p>Enter Password</p>
          <input onChange={(event) => {
            this.handleLoginPassword(event)}
          }/>
          <p></p>
          <button>Sign In</button>
          <form onSubmit={this.props.handleHome}>
            <button>Home</button>
          </form>
        </form>
      </div>
    );
  }

}


export default Login;