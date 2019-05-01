import React from 'react';
import { Nav, Button} from 'react-bootstrap';

export class AdminStudentSideBar extends React.Component {
  render() {
    return (
      <div className="Admin-Student-Side-Bar-main-frame">
        <div className="Admin-Student-Side-Bar-Link-frame">
        <hr/>
        <div className="Admin-Student-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/student">Add Student In Excel</Nav.Link>
          </Nav>
        </div>
        <hr/>
        <div className="Admin-Student-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/student/manualadd">Manual Add Student</Nav.Link>
          </Nav>
        </div>
        <hr/>
        <div className="Admin-Student-Side-Bar-Link">
          <Nav className="mr-auto">
            <Nav.Link href="/adminaccount/student/updatestudent">Update Student Data</Nav.Link>
          </Nav>
        </div>
        <hr/>
        </div>
      </div>
    );
  }
}
