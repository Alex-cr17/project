import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { chatUser } from '../actions/authentication';
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
    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="container channel" id="channel-" style={{ marginTop: '50px', width: '700px'}}>
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
        </div>
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