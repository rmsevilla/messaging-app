import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
//   let userID = localStorage.getItem("userID");
//   if(userID == null){
//     localStorage.setItem("userID",1);
//   }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    // localStorage.setItem('userName'+userID, userName);
    // localStorage.setItem("userID",userID + 1);
    navigate('/chat');
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  );
};

export default Home;