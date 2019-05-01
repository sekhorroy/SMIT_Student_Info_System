import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, NavItem} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { getFromStorage } from '../../Util/LocalStorage';
import { removeFromStorage } from '../../Util/LocalStorage';

export class AdminNav extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    const obj = getFromStorage('admin_obj');
    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/admin/logout', {
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
          this.setState({
            token: '',
          });
          removeFromStorage('admin_obj');
          const { from } = this.props.location.state || { from: {pathname: "/adminlogin"}};
          this.props.history.push(from);
        } else {
          console.log('here');
        }
      });
    }
  }

  render() {
      return (
        <div className="Navbar-main-frame">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand>SMIT ADMIN PANEL</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/adminaccount">Home</Nav.Link>
                <Nav.Link href="/adminaccount/student">Student</Nav.Link>
                <Nav.Link href="/adminaccount/faculty">Faculty</Nav.Link>
                <Nav.Link href="">Admin</Nav.Link>
                <Nav.Link href="/adminaccount/fee">Fee</Nav.Link>
              </Nav>
                <Button variant="dark"  onClick={this.onLogout}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>
        </div>
      );
  }
}
