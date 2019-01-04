const MessageModel = require('./models/Message');
const socketioJwt = require('socketio-jwt');
module.exports = io => {
  io.use(socketioJwt.authorize({
    secret: 'secret',
    handshake: true
  }));

  io.on('connection', function (socket) {
   
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
      io.emit("message", obj);
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