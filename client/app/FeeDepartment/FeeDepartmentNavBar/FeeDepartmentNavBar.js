import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
//import { LinkContainer, DropdownButton, Dropdown, Item} from 'react-router-bootstrap';
import { getFromStorage, removeFromStorage } from '../../Util/LocalStorage';


export class FeeDepartmentNavBar extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    const obj = getFromStorage('feedepart_obj');
    //console.log(obj);
    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/feedepartment/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      })
      .then(res => res.json())
      .then(json => {
        if(json.success){
          removeFromStorage('feedepart_obj');
          const { from } = this.props.location.state || { from: {pathname: "/feedepartlogin"}};
          this.props.history.push(from);
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    }
  }

  render() {
    const obj = getFromStorage('feedepart_obj');
    return (
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/feedepart"><i className="fas fa-user"></i> Welcome {obj.empId}</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>

        <Button variant="dark"  onClick={this.onLogout}><i className="fas fa-sign-out-alt"></i> Logout</Button>
      </Navbar>
      </div>
    );
  }
}
