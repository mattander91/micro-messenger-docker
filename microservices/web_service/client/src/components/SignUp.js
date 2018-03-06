import React from 'react';

const SignUp = (props) => {
  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={props.homeClick}>
        <button>Home</button>
      </form>
      <form onSubmit={props.signupNewUser}>
        <p>Enter Username: </p>
        <input onChange={(event) => {
          props.handleNewUsername(event)}
        }/>
        <p>Enter Password</p>
        <input onChange={(event) => {
          props.handleNewPassword(event)}
        }/>
        <p></p>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignUp;