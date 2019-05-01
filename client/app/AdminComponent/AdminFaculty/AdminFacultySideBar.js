import React from 'react';
import { Nav, Button} from 'react-bootstrap';

export class AdminFacultySideBar extends React.Component {
  render() {
    return (
      <div className="Admin-Faculty-Side-Bar-main-frame">
        <div className="Admin-Faculty-Side-Bar-Link-frame">
        <hr/>
        <div className="Admin-Faculty-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/faculty">Add Faculty</Nav.Link>
          </Nav>
        </div>
        <hr/>
        <div className="Admin-Faculty-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/faculty/view-all">View All Faculty</Nav.Link>
          </Nav>
        </div>
        <hr/>
        <div className="Admin-Faculty-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/faculty/removefaculty">Remove Faculty</Nav.Link>
          </Nav>
        </div>
        <hr/>
        </div>
      </div>
    );
  }
}
