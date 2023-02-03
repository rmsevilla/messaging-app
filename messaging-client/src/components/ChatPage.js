import React,{useEffect,useState,useRef}from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "./ChatPage.css";

const ChatPage = ({ socket }) => {

    const [messages,setMessages] =  useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const lastMessageRef = useRef(null);
    const [isLightTheme,setTheme] = useState(true); // true for light theme, false for dark theme
    
    const handleSwitchTheme = () =>{
      setTheme(!isLightTheme);
    }
  

    useEffect(()=>{
      socket.on('typingResponse',(data)=>setTypingStatus(data));
    },[socket]);  
    
    useEffect(()=>{
      socket.on('doneTypingResponse',(data)=>setTypingStatus(data)); //data here is empty string
    },[socket]);
 

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
      }, [socket, messages]);

    useEffect(() => {
        // scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} isLightTheme={isLightTheme}/>
      <div className="chat__main">
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} handleSwitchTheme={handleSwitchTheme} isLightTheme={isLightTheme}/>
        <ChatFooter socket = {socket}  isLightTheme={isLightTheme}/>
      </div>
    </div>
  );
};

export default ChatPage;