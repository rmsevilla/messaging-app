import React, { useState } from 'react';
import "./ChatFooter.css";

const ChatFooter = ({socket,isLightTheme}) => {
  const [message, setMessage] = useState('');

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    //this is truthy. but if userName do not exist, getItem return null, which is falsy
    if (message.trim() && localStorage.getItem('userName')) {
        socket.emit('message', {
          text: message,
          name: localStorage.getItem('userName'),
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id,
        });
        socket.emit('doneTyping',"");
      }
    setMessage('');
  };

  if(isLightTheme){
    return (
      <div className="chat__footer">
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button className="sendBtn">SEND</button>
        </form>
      </div>
    );
  }
  else{
    return (
      <div className="chat__footer__dark">
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="message__dark"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleTyping}
          />
          <button className="sendBtn__dark">SEND</button>
        </form>
      </div>
    );
  }
  
};

export default ChatFooter;