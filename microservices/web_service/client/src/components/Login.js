import React from 'react';

const Login = (props) => {
  return (
    <div>
      <h1>Log in Account</h1>
      <form onSubmit={props.homeClick}>
        <button>Home</button>
      </form>
      <form onSubmit={props.loginUser}>
        <p>Enter Username: </p>
        <input onChange={(event) => {
          props.handleLoginUsername(event)}
        }/>
        <p>Enter Password</p>
        <input onChange={(event) => {
          props.handleLoginPassword(event)}
        }/>
        <p></p>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;