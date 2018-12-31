import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { chatUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class ChatComponent extends Component {
   constructor() {
    super();
    this.state = {
        message: ''
    }
   }

componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/')
    }
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
}

componentDidMount() {
    if(!this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
}
   onChangeMessage(event) {
       this.setState({
        [event.target.name]: event.target.value
       })
   }
   handleSubmit() {
    // e.preventDefault();
    this.props.chatUser();
}

    // handlerSendMessage(event) {
    // const socket = io.connect('http://localhost:8080');

    //     event.preventDefault();
    //     if(this.state.message !== '') {
    //         socket.emit('msg', this.state.message);
    //         socket.on('msg', data => this.addMessage(data))
    //     }

    //     this.textareaRefMessage.value = ''
    //     this.setState({
    //         [event.target.name]: ''
    //        })
    // }

    addMessage(data) {
        document.getElementById('display_chat').append(`<div>${data.message}</div>`);
    }
    render() {
        return (
            <div>
                <div className="display-chat" id="display_chat">
                
                </div>
                <textarea name="message" ref={(textarea) => this.textareaRefMessage = textarea } onChange={(event => this.onChangeMessage(event))}>

                </textarea>
               
                <button onClick={(event)=> this.handleSubmit(event)}>Send</button>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// export default connect({ chatUser })(withRouter(ChatComponent))
export  default connect(mapStateToProps, { chatUser })(ChatComponent)