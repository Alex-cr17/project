import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8080');
function subscribeToTimer() {
  socket.on('timer', timestamp => {
      console.log(timestamp)
  })
}
export { subscribeToTimer };