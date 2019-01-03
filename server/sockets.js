// const MessageModel = require('./models/messages.model');
const socketioJwt = require('socketio-jwt');

module.exports = io => {
  io.use(socketioJwt.authorize({
    secret: 'secret',
    handshake: true
  }));

  io.on('connection', function (socket) {
      socket.emit('connected', `${socket.decoded_token.name} was connected`);
      
      socket.on('message', (message) => {
        console.log(message);
        socket.emit('message', message);
        // socket.to('all').emit("message", message);
      });
    //  socket.on('message', content => {
    //      console.log(content);
    //     socket.emit("message", content);

            // const obj = {
            //     date: new Date(),
            //     content: content,
            //     name: socket.name
            // };

            // MessageModel.create(obj, err => {
            //     if(err) return console.error("MessageModel", err);
            //     socket.emit("message", obj);
            //     socket.to('all').emit("message", obj);
            // });
        // });

  })
        // socket.on('receiveHistory', () => {
        //     MessageModel
        //         .find({})
        //         .sort({date: -1})
        //         .limit(50)
        //         .sort({date: 1})
        //         .lean()
        //         .exec( (err, messages) => {
        //             if(!err){
        //                 socket.emit("history", messages);
        //             }
        //         })
        // })
    // });
};