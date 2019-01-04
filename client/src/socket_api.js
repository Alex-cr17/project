import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080', {
        'query': 'token=' + localStorage.jwtToken.split(' ')[1]
    });
    socket.on('connected', function (msg) {
            console.log(msg);
    });
function sendMessage(message, cb) {
  socket.emit('message', message);
  socket.on('message', message => {
        console.log("message", message);
        cb(null, message)
        
        });
}
export { sendMessage };