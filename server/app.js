const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const path = require('path');
const cors = require('cors');
const users = require('./routes/user'); 

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
    );
    const PORT = 8080;
    
const app = express();
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
app.use(cors());
const io = require('socket.io').listen(server)
    require('./passport')(passport);
    app.use(passport.initialize());
    // app.use(express.static(__dirname + "/../client/build"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(users);

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/../client/build/index.html'));
// });



require('./sockets')(io);