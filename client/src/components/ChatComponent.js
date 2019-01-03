import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getUsersList, getListMessages } from '../actions/authentication';
import  { sendMessage } from'../socket_api';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
class ChatComponent extends Component {
   constructor() {
    super();
    this.state = {
        message: '',
        errors: {},
        timestamp: "not yet"
    }
}
   handleChange(e) {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value 
    })
   }
   handleSendMessage(e) {
    e.preventDefault();

    sendMessage(this.state.message, (err, message) => this.props.getListMessages(message));
    console.log(this.props)
  };
   componentDidMount() {
        this.props.getUsersList();
   }
    render() {
        
        const { errors } = this.state;
        
        const isFetching = false;
        const object = _.map(this.props.users);
        const users = object.map((item, index) => {
            return (
                <li key={index.toString()} style={{ listStyleType: 'none', margin: '25px', border: '1px solid grey', justifyContent: 'space-beetwen'}}>
                        <div>
                        <img src={item.avatar} className="avatar"/>
                        <span className="username">{item.name}</span>
                        </div>
                        <span className="btn btn-primary">Start conversation</span>
                    </li>
            )
            })
        return (
            <div>
            
                <div className="container-fluid channels" id="channels" style={{ marginTop: '50px'}}>
                <div className="row">
                {this.state.timestamp}
                <div className="col-md-4">
                <ul >
                    { users } 
                </ul>
                </div>
                <div className="col-md-8">
                <ul id="chat">
                </ul>
                <textarea name="message" onChange={(event) => this.handleChange(event)}>

                </textarea>
                <button onClick={(event) => this.handleSendMessage(event)}>Send message</button>
                </div>
                </div>
              
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    users: state.users
});

// export default connect({ chatUser })(withRouter(ChatComponent))
export  default connect(mapStateToProps, { getUsersList, getListMessages })(ChatComponent)