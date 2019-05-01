import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { AdminStudentView } from './AdminStudentView/AdminStudentView';
import './AdminViewAll.css';

export class AdminViewAll extends React.Component {
  render() {
    return (
      <div className="AdminViewAll-main-frame">
        <div>
          <Tabs defaultActiveKey="ViewAllStudents" id="uncontrolled-tab-example">
            <Tab eventKey="ViewAllStudents" title="View Students">
            <div className="AdminViewAll-yearwise-main-frame">
              <Tabs defaultActiveKey="1stYear" id="uncontrolled-tab-example">
                <Tab eventKey="1stYear" title="1stYear">
                  <AdminStudentView year="1"/>
                </Tab>
                <Tab eventKey="2ndYear" title="2ndYear">
                  <AdminStudentView year="2"/>
                </Tab>
                <Tab eventKey="3rdYear" title="3rdYear">
                  <AdminStudentView year="3"/>
                </Tab>
                <Tab eventKey="4thYear" title="4thYear">
                  <AdminStudentView year="4"/>
                </Tab>
             </Tabs>
             </div>
            </Tab>
            <Tab eventKey="ViewAllFaculty" title= "View Faculty">
              
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>

            </Tab>
         </Tabs>
        </div>
      </div>
    );
  }
}
