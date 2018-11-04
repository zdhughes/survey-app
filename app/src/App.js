import React, { Component } from 'react';
import Navigator from "./components/Navigator";
import ServiceRouter from './components/ServiceRouter';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      service: "home"
    };
    this.changeService = this.changeService.bind(this);
  }

  changeService(event) {
    const target = event.target
    this.setState({
      service: target.name
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <Navigator onClick={this.changeService} />
        </div>
        <div>
          <ServiceRouter service={this.state.service}/>
        </div>
      </div>
    );
  }
}

export default App;
