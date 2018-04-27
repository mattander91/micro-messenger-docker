import React from 'react';

const GroupsList = (props) => {
  return (
    <div className="groupList">
      {props.groups.map(group =>
        <div className="group" onClick={() => {
          props.fetchMessagesFromClick(group.groupName)}}>{group.groupName}
          <button className="btn" onClick={(event) => {
          props.deleteGroup(group.groupName)
          props.deleteMessages(group.groupName)
          event.stopPropagation()}}><i className="fa fa-trash"></i></button>
      </div>
      )}
    </div>
  );
}



export default GroupsList;