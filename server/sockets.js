const MessageModel = require('./models/Message');
const socketioJwt = require('socketio-jwt');
module.exports = io => {
  io.use(socketioJwt.authorize({
    secret: 'secret',
    handshake: true
  }));

  io.on('connection', function (socket) {
   
    let channel = socket.decoded_token.name;
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
      console.log(socket.decoded_token.name)
      const obj = {
        date: new Date(),
        content: content,
        name: socket.decoded_token.name
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
          .sort({date: -1})
          .limit(50)
          .sort({date: 1})
          .lean()
          .exec( (err, messages) => {
              if(!err){
                  socket.emit("history", messages);
              }
          })
  })

  });

};