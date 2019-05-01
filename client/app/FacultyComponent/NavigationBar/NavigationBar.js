import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
//import { LinkContainer, DropdownButton, Dropdown, Item} from 'react-router-bootstrap';
import { getFromStorage, removeFromStorage } from '../../Util/LocalStorage';


class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    const obj = getFromStorage('faculty_obj');
    console.log(obj);
    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/facultyaccount/logout', {
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
          removeFromStorage('faculty_obj');
          const { from } = this.props.location.state || { from: {pathname: "/facultylogin"}};
          this.props.history.push(from);
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    }
  }
/*
  render() {
    const obj = getFromStorage('faculty_obj');
    return (
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/faculty">Welcome {obj.empId}</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/faculty/registration">Registration</Nav.Link>
        </Nav>
        <Nav className="mr-sm-2">
        <Nav.Link href="/faculty/registration">Registration</Nav.Link>
        </Nav>
        <Button variant="dark"  onClick={this.onLogout}>Logout</Button>
      </Navbar>
      </div>
    );
  }
}
*/
render() {
  const obj = getFromStorage('faculty_obj');
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand><i className="fas fa-user"></i> Welcome { obj.empId }</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/faculty/home"><span className="registration-btn"><i className="fas fa-home"></i> Home</span></Nav.Link>
        </Nav>
         <Nav.Link className="mr-sm-2" href="/faculty/registration"><span className="registration-btn"><i className="fas fa-registered"></i> Registration</span></Nav.Link>
         <Nav.Link className="mr-sm-2" onClick={this.onLogout}><span className="registration-btn"><i className="fas fa-sign-out-alt"></i> Logout</span></Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
}

export default Navigationbar;
