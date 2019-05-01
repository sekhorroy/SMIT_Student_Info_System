import React from 'react';
import { Nav, Button} from 'react-bootstrap';

export class AdminFeeSideBar extends React.Component {
  render() {
    return (
      <div className="Admin-Fee-Side-Bar-main-frame">
        <div className="Admin-Fee-Side-Bar-Link-frame">
        <hr/>
        <div className="Admin-Fee-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/faculty">Add Fee Dept Employee</Nav.Link>
          </Nav>
        </div>
        <hr/>
        <div className="Admin-Fee-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/fee/addfeestructure">Add/Remove Fee Structure</Nav.Link>
          </Nav>
        </div>
        <hr/>
        <div className="Admin-Fee-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/fee/updatefeestructure">Update Fee Structure</Nav.Link>
          </Nav>
        </div>
        <hr/>
        <div className="Admin-Fee-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/faculty/removefaculty">Remove Fee Dept Employee</Nav.Link>
          </Nav>
        </div>
        <hr/>
        </div>
      </div>
    );
  }
}
