const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


// const database = require('./database');
var cors = require('cors');
var path = require('path');


http.listen(8080, function() {
    console.log('listening on port ', '8080');

})

io.on('connection', socket => {
    console.log('New client connected')
    
    socket.on('send message', (message) => {
      io.sockets.emit('send message', message)
      console.log(message);
    })
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

// Serve the static files from the React app

// app.use(express.static(__dirname + "/../client/build"));

app.use(cors());
// database.initializeMongo();

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/../client/build/index.html'));
// });

// app.get('/api', function(req, res) {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
// })
