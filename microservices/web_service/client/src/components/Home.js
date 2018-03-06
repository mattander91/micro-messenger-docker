import React from 'react';

const Home= (props) => {
  return (
    <div>
      <h1><i>micro_messenger</i></h1>
      <button>Home</button> &nbsp;
      <button onClick={props.handleSignupClick}>Sign Up</button> &nbsp;
      <button onClick={props.handleLoginClick}>Log in</button> &nbsp;
      <button>About</button>
    </div>
  );
}

export default Home;