
import { useNavigate } from 'react-router-dom';
import "./ChatBody.css";

const ChatBody = ({messages,lastMessageRef,typingStatus,isLightTheme,handleSwitchTheme}) => {
  const navigate = useNavigate();


  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    //try remove this later
    window.location.reload();
  };

  const handleSwitchThemeChild = () =>{
    handleSwitchTheme();
  }


  if(isLightTheme){
    return (
      <>
        <header className="chat__mainHeader">
          <p>Hangout with Colleagues</p>
          <button className='switch__theme__btn' onClick={handleSwitchThemeChild}> Switch To Dark Theme</button>
          <button className="leaveChat__btn" onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
        </header>
  
        {/*This shows messages sent from you*/}
        <div className="message__container">
          {messages.map((message) =>
            message.name === localStorage.getItem('userName') ? (
              <div className="message__chats" key={message.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats" key={message.id}>
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )}
  
          {/*This is triggered when a user is typing*/}
          <div className="message__status">
            <p>{typingStatus}</p>
          </div>
  
          <div ref={lastMessageRef} />
        </div>
      </>
    );
  }

  else{
    return(<>
        <header className="chat__mainHeader__dark">
          <p>Hangout with Colleagues</p>
          <button className='switch__theme__btn__dark' onClick={handleSwitchTheme}> Switch To Light Theme</button>
          <button className="leaveChat__btn__dark" onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
        </header>
  
        {/*This shows messages sent from you*/}
        <div className="message__container__dark">
          {messages.map((message) =>
            message.name === localStorage.getItem('userName') ? (
              <div className="message__chats__dark" key={message.id}>
                <p className="sender__name__dark">You</p>
                <div className="message__sender__dark">
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats__dark" key={message.id}>
                <p>{message.name}</p>
                <div className="message__recipient__dark">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )}
  
          {/*This is triggered when a user is typing*/}
          <div className="message__status__dark">
            <p>{typingStatus}</p>
          </div>
  
          <div ref={lastMessageRef} />
        </div>
      
    </>)
  }
 
};

export default ChatBody;