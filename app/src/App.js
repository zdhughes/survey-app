import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
// import SurveyContainer from './components/SurveyContainer';
import SingleQuestion from './components/SingleQuestion';
import SampleForm from './components/SampleForm';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <PageHeader>
          Survey: <small>Please select from the dropdown</small>
        </PageHeader>
        <SampleForm />
      </div>
    );
  }
}

export default App;
