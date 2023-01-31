const express = require('express');
const app = express();
const PORT =4000;


const http = require('http').Server(app);//this will make http a server?
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin:['http://localhost:3000','http://localhost:3001']
    },
});

//================Handling socket=================================================

//users is an array that save the userName and socketID
let users = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    //listen and log message to console
    socket.on('message', (data) => {
      socketIO.emit("messageResponse", data);
    });

    socket.on('typing',(data)=>socket.broadcast.emit('typingResponse',data));

    socket.on('doneTyping',(data)=>socket.broadcast.emit('doneTypingResponse',data));//data here is the empty string

    //data is a json obj with userName and socket.id
    socket.on('newUser',(data)=>{
        users.push(data);
        socketIO.emit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter((user)=>user.socketID !==socket.id);
      socketIO.emit('newUserResponse', users);
      socket.disconnect();
    });
});


//==============================================================

//localhost3000/api
app.get('/api', (req, res) => {
    res.json({
      message: 'Hello world',
    });
  });
  
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
