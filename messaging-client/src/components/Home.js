import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    socket.emit('newUser',{userName,socketID:socket.id});//this is new user event 
    navigate('/chat');
  };
  return (
    <div className="home">
      <div class="card shadow-sm p-3 mb-5 mx-auto" style={{width: '30rem', height: '30rem', marginTop: '150px'}}>
        <div class="card-body">
        <form class="home__container" onSubmit={handleSubmit} style={{ height: '50%', width: '100%', marginTop: '80px' }}>
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
        </div>
      </div>
    </div>
  );
};

export default Home;