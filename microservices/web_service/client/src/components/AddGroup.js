import React from 'react';

const AddGroup = (props) => {
  return (
    <div>
    <br></br>
      <form onSubmit={props.addNewGroup}>
        <p>Add Group</p>
        <input onChange={(event) => {
          props.handleAddGroup(event)}
        }/>
        <button>Add Group</button>
      </form>
    </div>
  );
}

export default AddGroup;