const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const cors = require('cors');
const server = require('http').Server(express);
const io = require('socket.io')(server, {serveClient: true})
const users = require('./routes/user'); 

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(cors());
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send('hello');
});

io.on('connection', function (socket) {
    // socket.emit('news', { hello: 'world' });
    socket.emit('connected', "You connected");
    socket.on('msg', (message) => {
        obj = {
            data: new Date(),
            message: message,
            username: "Sasha"
        }
    socket.emit('msg', obj);
    });
    // socket.on('message', function (data) {
    //   console.log(data);
    // });
  });
  
const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});