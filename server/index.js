"use strict";

const express = require('express');
const app = express();
// const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const { Strategy } = require('passport-jwt');
var cors = require('cors');
var path = require('path');
const { jwt } = require('./config');
app.use(cors());

passport.use(new Strategy(jwt, function(jwt_payload, done) {
    if(jwt_payload != void(0)) return done(false, jwt_payload);
    done();
}));

mongoose.connect('mongodb://database:27017/chat', {useMongoClient: true});
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

// nunjucks.configure('./client/views', {
//     autoescape: true,
//     express: app
// });
app.use(express.static(__dirname + "/../client/build"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

require('./router')(app);

require('./sockets')(io);

server.listen(8080, () => {
    console.log('Server started on port 8080');
});