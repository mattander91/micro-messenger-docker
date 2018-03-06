import React from 'react';

const Messages = (props) => {
  return (
    <div>
      <form className="Messages" onSubmit={props.submitMessage}>
        <p>Enter Message</p>
        <input onChange={(event) => {
          props.handleMessageChange(event)}
        }/>
        <button>Send</button>
      </form>
      <div className="Messages">
        <p>Messages List</p>
        <ul>
          {props.messages.map(message =>
            <li>Message: {message.message}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Messages;