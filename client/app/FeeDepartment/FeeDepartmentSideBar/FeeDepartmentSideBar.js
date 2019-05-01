import React from 'react';
import { Nav, Button} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

export class FeeDepartmentSideBar extends React.Component {
  render(){
    return (
      <div className="sidenav-main-frame">
        <div className="more-options-frame">
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/feedepart/checkfee"><i className="fas fa-book"></i> Check Fee</Nav.Link>
            </Nav>
          </div>
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/feedepart/updatefee"><i className="fas fa-pen-square"></i> Update Fee</Nav.Link>
            </Nav>
          </div>
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/feedepart/checkdefaulter"><i className="fas fa-receipt"></i> Check Defaulter</Nav.Link>
            </Nav>
          </div>
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="#"><i className="fas fa-user-shield"></i> Update Password</Nav.Link>
            </Nav>
          </div>
          <hr/>
        </div>
      </div>
      );
  }
}
