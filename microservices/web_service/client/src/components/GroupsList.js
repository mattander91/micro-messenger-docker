import React from 'react';

const GroupsList = (props) => {
  return (
    <div>
      <p>Group List</p>
      <ul>
        {props.groups.map(group=>
          <li>{group.groupName}</li>
        )}
      </ul>
    </div>
  );
}

export default GroupsList;