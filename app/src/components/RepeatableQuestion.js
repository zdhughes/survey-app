import React, { Component } from 'react';
import { ControlLabel, FormControl, Button } from 'react-bootstrap';

class RepeatableQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = { "count": 0 };
  }

  render() {
    return (
      <div>
        <ControlLabel>{this.props.text}</ControlLabel>
        <FormControl
          type="text"
          id={this.props.valueKey}
          value={this.props.value}
          onChange={this.props.onChange} />
        <Button id={this.props.valueKey} onClick={this.props.onClick}>Add Another Answer</Button>
      </div>
    );
  }
}

export default RepeatableQuestion;
