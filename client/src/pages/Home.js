import React, { Component } from 'react';
import {apiUrl} from '../../src/config';

class Home extends Component {
  
constructor(props) {
  super(props);
  this.state = {
  }
}

handleGetResponse = () => {
    fetch(`${apiUrl}/api`).then(res => {

        console.log(res);
      });
}
  render() {
    return (
      <div>
          <button onClick={() => this.handleGetResponse()}>Get</button>
      </div>
    );
  }
}

export default Home;
