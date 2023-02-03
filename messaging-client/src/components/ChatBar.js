import React, { useEffect, useState } from 'react';
import "./ChatBar.css";

const ChatBar = ({socket,isLightTheme}) => {
  const [users,setUsers] = useState([]);

  useEffect(()=>{
    socket.on('newUserResponse',(data)=>{setUsers(data)});
  },[socket,users]);

  if(isLightTheme){
    return (
      <div className="chat__sidebar">
        <h2>Open Chat</h2>
  
        <div>
          <h4 className="chat__header">ACTIVE USERS</h4>
          <div className="chat__users">
              {users.map((user)=>(<p key={user.socketID}>{user.userName}</p>))}
          </div>
        </div>
      </div>
    );
  }

  else{
    return (
      <div className="chat__sidebar__dark">
        <h2>Open Chat</h2>
  
        <div>
          <h4 className="chat__header__dark">ACTIVE USERS</h4>
          <div className="chat__users__dark">
              {users.map((user)=>(<p key={user.socketID}>{user.userName}</p>))}
          </div>
        </div>
      </div>
    );
  }

};

export default ChatBar;