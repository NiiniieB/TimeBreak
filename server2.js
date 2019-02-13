
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')


// our localhost port
const port = 5000

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected '+socket.id)
  socket.on('message', function(msg){
    console.log(' message reçu ' + msg + ' de ' + socket.id);
    io.emit('smessage',msg);
    console.log(msg)
    }
  )
  
  socket.on('disconnect', () => {
    console.log('user disconnected '+socket.id);
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))