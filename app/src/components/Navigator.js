import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Navigator extends Component {

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a name="home" href="/" onClick={this.props.onClick}>DIY Surveys</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem name="surveys" eventKey={1} href="surveys" onClick={this.props.onClick}>
            Surveys
          </NavItem>
          <NavItem name="responses" eventKey={2} href="responses" onClick={this.props.onClick}>
            Responses
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigator;
