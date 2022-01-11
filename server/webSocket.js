const  { io } = require('./http')
const { v4: uuidv4 } = require('uuid');

const users = []
const messages = []

io.on("connection",  (socket) =>  {  

 console.log('um usuario se conectou com o id', socket.id)

  socket.on('select_room', data => {
    console.log('room select => ', data)
    
    socket.join(data.room)

    const userInRoom = users.find(user => user.username === data.username && user.room === data.room)

    if(userInRoom){
      userInRoom.socket_id = socket.id
    }else{
      users.push({
        ...data,
        socket_id: socket.id
      })
    }
  })

  socket.on("message", (data) => {

    const message = {
      id: uuidv4(),
      room: data.room,
      username: data.username,
      text: data.message,
      createdAt: new Date()
    }
    
    messages.push(message)

    io.to(data.room).emit('message', message)
    
  });
});


