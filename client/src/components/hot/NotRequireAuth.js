import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/chat');
      }
     
    }

    componentWillUpdate(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/chat');
      } 
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


  return connect(mapStateToProps)(NotAuthentication);
}