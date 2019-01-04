import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getUsersList, getListMessages } from '../actions/authentication';
// import  { sendMessage } from'../socket_api';
import Moment from 'react-moment';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

let socket;
class ChatComponent extends Component {
   constructor() {
    super();
    this.state = {
        message: '',
        errors: {},
        history: []
    }
}
   handleChange(e) {
    e.preventDefault();
    this.setState({
        [e.target.name]: e.target.value 
    })
   }
  
   componentDidMount() {
       socket = io.connect('http://localhost:8080', {
           'query': 'token=' + localStorage.jwtToken.split(' ')[1]
       });


    socket.on('connect', function () {
        socket.emit('receiveHistory');
    });

       this.props.getUsersList();   
    socket.on('message', (data) => {
        this.setState({
            history: [...this.state.history, data]
        })
      });

      socket.on('history', (history) => {
          console.log("asdas", history)
        this.setState({
            history: history
        })
      });
   }


   handleSendMessage(e) {
    e.preventDefault();
    if(this.state.message) {
    socket.emit('message', this.state.message);
    this.props.getListMessages(this.state.message);
    this.message.value = '';
    this.setState({
        message: this.message
    })
 } 
    };

    render() {
        
        const { errors } = this.state;
        
        const isFetching = false;
        const object = _.map(this.props.users);
        const history = this.state.history.map((item, index) => {
            return (
                <li key={index.toString()} style={{ listStyleType: 'none', padding: '15px', justifyContent: 'space-beetwen'}}>
                        <div>
                        <div style={{justifyContent: "space-between", paddingBottom: '5px'}}>

                        <span style={{color: '#0069d9', fontSize: '16px', marginRight: '10px'}} className="name">{item.name}</span>
                        <span style={{color: '#adadad', fontSize: '12px'}} className="date">
                            <Moment format="LLLL" >
                                {item.date}
                            </Moment>
                        </span>
                        </div>
                        <span className="content">{item.content}</span>
                        </div>
                    </li>
            )
        });
        const users = object.map((item, index) => {
            return (
                <li key={index.toString()} style={{ listStyleType: 'none', padding: '15px', justifyContent: 'space-beetwen'}}>
                        <div>
                        <div style={{justifyContent: "space-between"}}>
                        <img style={{ marginRight: "10px", borderRadius: '100%', width: '30px', height: '30px'}} src={item.avatar} className="avatar"/>
                        <span className="username">{item.name}</span>
                        </div>
                        </div>
                    </li>
            )
            })
        return (
            
            <div>
            
                <div className="container channels" id="channels" style={{ marginTop: '50px'}}>
                <div className="row" style={{height: 'calc(100vh - 110px)' }}>
                <div className="col-md-4">
                <ul style={{ border: '1px solid #dedede', padding: '0'}}>
                    { users } 
                </ul>
                </div>
                <div className="col-md-8">
                <ul id="chat" style={{ height: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                {history}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px'}}>
                <textarea name="message" style={{ flex: '2 1 100%', marginRight: '20px'}} ref={textarea => this.message = textarea} onChange={(event) => this.handleChange(event)}>

                </textarea>
                <button style={{ flex: '2 3 100%'}} className="btn btn-primary" onClick={(event) => this.handleSendMessage(event)}>Send message</button>
                </div>
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