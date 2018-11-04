import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

class Welcome extends Component {

  render() {
    return(
      <div>
        <Jumbotron>
          <h1>Welcome to the DIY survey app!</h1>
          <p>
            Things are currently under development, but we hope you
            enjoy your stay.
          </p>
        </Jumbotron>
      </div>
    )
  }
}

export default Welcome;
