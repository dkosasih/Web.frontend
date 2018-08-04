import './App.css';

import * as React from 'react';
import  * as Nav from 'react-bootstrap/lib/Nav';
import  * as Navbar from 'react-bootstrap/lib/Navbar';
import  * as NavItem from 'react-bootstrap/lib/NavItem';

import { ComponentAuth } from 'auth/auth';
import { BrowserHistory } from 'routes';

interface ComponentProps extends ComponentAuth, BrowserHistory {}

class App extends React.PureComponent<ComponentProps> {
  
  login() {
    this.props.auth!.login();
  }

  logout() {
    this.props.auth!.logout();
  }

  goTo(route: string) {
    this.props.history!.replace(`/${route}`)
  }

  render() {
    const { isAuthenticated } = this.props.auth!;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="logo" onClick={()=>this.goTo('')}>JB</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {isAuthenticated() && (
            <NavItem eventKey={1} onClick={() => this.goTo('products')}>
              All Items
          </NavItem>
          )}
        </Nav>
        <Nav className="pull-right right-menu" >
          {!isAuthenticated() && (
            <NavItem eventKey={2.1} onClick={()=>this.login()}>
              Login
            </NavItem>
          )}
          {isAuthenticated() && (
            <NavItem eventKey={2.1} onClick={()=>this.logout()}>
              Logout
            </NavItem>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default App;
