const path = require('path')
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  console.log('connection', socket);
  socket.on('chat message', function(msg){
    console.log('>>> incoming message:', msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
