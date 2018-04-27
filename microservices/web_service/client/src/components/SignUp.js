import React from 'react';
import $ from 'jquery';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserName: '',
      newPassword: ''
    };

    this.handleNewUsername = this.handleNewUsername.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.signupNewUser = this.signupNewUser.bind(this);
  }

  handleNewUsername(e) {
    let newUserName = e.target.value;
    this.setState({
      newUserName: newUserName
    });
  }

  handleNewPassword(e) {
    let newPassword = e.target.value;
    this.setState({
      newPassword: newPassword
    });
  }

  signupNewUser(e) {
    e.preventDefault();
    let newUser = {
      username: this.state.newUserName,
      password: this.state.newPassword
    }
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:3001/signUp',
      data: newUser,
      success: () => {
        sessionStorage.setItem('user', this.state.newUserName);
        this.props.handleHome();
        this.props.setUser();
      },
      error: (err) => {
        console.log('Signup failed: ', err);
      }
    });
  }



render() {
  return (
    <div className="accountForm">
      <form onSubmit={this.signupNewUser}>
        <p>Enter Username: </p>
        <input onChange={(event) => {
          this.handleNewUsername(event)}
        }/>
        <p>Enter Password</p>
        <input onChange={(event) => {
          this.handleNewPassword(event)}
        }/>
        <p></p>
        <button>Sign Up</button>
        <form onSubmit={this.props.handleHome}>
          <button>Home</button>
        </form>
      </form>
    </div>
  );
 }
}

export default SignUp;