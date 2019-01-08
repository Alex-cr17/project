const MessageModel = require('./models/Message');
const jwt = require('jsonwebtoken');
module.exports = io => {
  io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
      jwt.verify(socket.handshake.query.token, 'secret', function(err, decoded) {
        if(err) {
          return next(new Error('Authentication error'));
        }
        socket.decoded = decoded;
        next(false, {name: decoded.name, id: decoded.id});
      });
    } else {
        next(new Error('Authentication error'));
    }    
  }).on('connection', function(socket) {
      console.log('connected', `you are connected to chat as ${socket.decoded.name}`);

    let channel = socket.decoded.name;
    socket.join(channel);
    socket.on('change channel', function(newChannel) {
      console.log(newChannel);
      socket.leave(channel);
      socket.join(newChannel);
      channel = newChannel;

      socket.emit('change channel', newChannel)
    })

    // sending message
    socket.on('message', function (content) {
      const obj = {
        date: new Date(),
        content: content,
        name: socket.decoded.name
    };
    MessageModel.create(obj, err => {
      if(err) return console.error("MessageModel", err);
      io.sockets.in(channel).emit("message", obj, socket.id);
      // io.emit("message", obj);
  });

    });

// receiving
socket.on('receiveHistory', () => {
  MessageModel
      .find({})
      .lean()
      .exec( (err, messages) => {
          if(!err){
              socket.emit("history", messages);
          }
      })
})
  });

};