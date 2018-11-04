import React, { Component } from 'react';
import { ControlLabel, FormControl } from 'react-bootstrap';

class SingleQuestion extends Component {

  render() {
    return (
      <div>
        <ControlLabel>{this.props.text}</ControlLabel>
        <FormControl
          type="text"
          id={this.props.valueKey}
          value={this.props.value}
          onChange={this.props.onChange} />
      </div>
    );
  }
}

export default SingleQuestion;
