import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Button, NavItem} from 'react-bootstrap';
import { getFromStorage } from '../../Util/LocalStorage';
import { Home } from '../Home/Home';
import { NavLink } from 'react-router-dom';
import { FeePayment } from '../FeePayment/FeePayment';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
//import { LinkContainer } from 'react-router-bootstrap';
import './Navigationbar.css';
import { removeFromStorage } from '../../Util/LocalStorage';

class Navigationbar extends Component {

  constructor(props){
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    const obj = getFromStorage('student_info_app');
    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/account/logout?token='+token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          removeFromStorage('student_info_app');
          removeFromStorage('studentObj');
          removeFromStorage('student_academic_details');
          console.log('here');
          const { from } = this.props.location.state || { from: {pathname: "/login"}};
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
    return(
      <div className="Navbar-main-frame">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand><i className="fas fa-user"></i> WELCOME {this.props.studentObj.regNo}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/account"><i className="fas fa-home"></i> Home</Nav.Link>
              <Nav.Link href="/account/takequiz"><i className="fas fa-tasks"></i> Take Quiz</Nav.Link>
              <Nav.Link href="/account/feepayment"><i className="fas fa-money-check"></i> FeePayment</Nav.Link>
              <Nav.Link href="/account/registration"><i className="fas fa-registered"></i> Registration</Nav.Link>
            </Nav>
              <Button variant="dark"  onClick={this.onLogout}><i className="fas fa-sign-out-alt"></i> Logout</Button>
          </Navbar.Collapse>
      </Navbar>

      </div>
    );
  }
}

export default Navigationbar;
