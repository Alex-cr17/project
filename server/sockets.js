

const MessageModel = require('./models/Message')
module.exports = io => {

io.on('connection', (client) => {
    client.emit('connected', "Hello");

    // const newmessage = new MessageModel({
    //     name: req.body.name,
    //     content: req.body.content
    // });
});

}

// const port = 8080;
// io.listen(port);
// console.log('listening on port ', port);