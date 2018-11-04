import React, { Component } from 'react';
import SingleQuestion from './SingleQuestion';
import RepeatableQuestion from './RepeatableQuestion';

class SurveyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "answers": {},
      "accounts": [
        "name":
      ]
    };

    this.handleSingleQuestionInput = this.handleSingleQuestionInput.bind(this);
    this.handleSingleQuestionInput = this.handleSingleQuestionInput.bind(this);

  }

  handleSingleQuestionInput(event) {
    const answers = this.state.answers;
    answers[event.target.id] = event.target.value
    this.setState({ "answers": answers })
    console.log(this.state)
  }

  handleRepeatableQuestionInput(event) {
    const answers = this.state.answers;
    answers[event.target.id] = event.target.value
    this.setState({ "answers": answers })
    console.log(this.state)
  }

  handleRepeatableQuestionButtonClick(event) {
    const newAccountObject = {"name": "", "number": ""}
    this.setState
    console.log(event.target.id)
  }

  render() {
    return (
      <div>
        This is a survey!
        <RepeatableQuestion
          text="What is a test question?"
          onChange={this.handleSingleQuestionInput}
          onClick={this.handleRepeatableQuestionButtonClick}
          valueKey="accounts"
          value={this.state.accounts} />
      </div>
    );
  }
}

export default SurveyContainer;
