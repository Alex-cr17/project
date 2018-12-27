import React, { Component } from 'react';
import io from 'socket.io-client';
export default class ChatComponent extends Component {
   constructor(props) {
    super(props);
    this.state = {
        message: ''
    }
   }
   componentWillMount() {
    const socket = io.connect('http://localhost:8080');
    socket.on('connected', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
   }
   onChangeMessage(event) {
       this.setState({
        [event.target.name]: event.target.value
       })
   }
    handlerSendMessage(event) {
    const socket = io.connect('http://localhost:8080');

        event.preventDefault();
        if(this.state.message !== '') {
            socket.emit('msg', this.state.message);
            socket.on('msg', data => this.addMessage(data))
        }

        this.textareaRefMessage.value = ''
        this.setState({
            [event.target.name]: ''
           })
    }

    addMessage(data) {
        document.getElementById('display_chat').append(`<div>${data.message}</div>`);
    }
    render() {
        // const socket = io.connect('http://localhost:8080');
        // socket.on('connected', function (data) {
        //   console.log(data);
        //   socket.emit('my other event', { my: 'data' });
        // });

        return (
            <div>
                <div className="display-chat" id="display_chat">
                
                </div>
                <textarea name="message" ref={(textarea) => this.textareaRefMessage = textarea } onChange={(event => this.onChangeMessage(event))}>

                </textarea>
               
                <button onClick={(event)=> this.handlerSendMessage(event)}>Send</button>
            </div>
        );
    }
}