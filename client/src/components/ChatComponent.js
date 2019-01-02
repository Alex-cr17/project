import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getUsersList } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

import classnames from 'classnames';

class ChatComponent extends Component {
   constructor() {
    super();
    this.state = {
        message: '',
        errors: {}
    }
   
   }
   handleChange(e) {
    e.preventDefault();

   }
   handleSubmit(e) {
    e.preventDefault();
   }
   componentDidMount() {
        this.props.getUsersList();
   }
    render() {
        const { errors } = this.state;
        return (
            <div>
 <div className="container channels" id="channels" style={{ marginTop: '50px', width: '700px'}}>
                
                <ul >
                    <li style={{ listStyleType: 'none', margin: '25px', border: '1px solid grey', justifyContent: 'space-beetwen'}}>
                        <div>
                        <span className="avatar">avatar</span>
                        <span className="username">username</span>
                        </div>
                        <span className="btn btn-primary">Start conversation</span>
                    </li>
                    <li className="highlight" style={{ listStyleType: 'none', margin: '25px', border: '1px solid grey'}}> 
                        <div>
                            <span className="avatar">avatar</span>
                            <span className="username">username</span>
                        </div>
                        <span className="btn btn-primary">Start conversation</span></li>
                    <li style={{ listStyleType: 'none', margin: '25px', border: '1px solid grey'}}> 
                        <div>
                            <span className="avatar">avatar</span>
                            <span className="username">username</span>
                        </div>
                        <span className="btn btn-primary">Start conversation</span></li>

                </ul>
                </div>
                {/* <div className="container channel" id="channel-" style={{ marginTop: '50px', width: '700px'}}>
                </div>
               <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <form onSubmit={ (event) => this.handleSubmit(event) }>
                <div className="form-group">
                    <textarea
                    onChange={ (event) => this.handleChange(event) }
                    type="text"
                    placeholder="Enter a message"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.message
                    })}
                    name="message"
                    ></textarea>
                    {errors.name && (<div className="invalid-feedback">{errors.message}</div>)}
                </div>
                
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Send message
                    </button>
                </div>
            </form>
        </div> */}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// export default connect({ chatUser })(withRouter(ChatComponent))
export  default connect(mapStateToProps, { getUsersList })(withRouter(ChatComponent))