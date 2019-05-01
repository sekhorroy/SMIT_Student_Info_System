import React from 'react';
import './AdminStudent.css';
import { AdminStudentSideBar } from './AdminStudentSideBar';
import { AdminAddStudentManual } from './AdminAddStudentManual';
import { AdminUpdateStudent } from './AdminUpdateStudent';
import { Route } from 'react-router-dom';
import { AdminAddStudent } from '../AdminAddStudent/AdminAddStudent';

export class AdminStudent extends React.Component {
  render() {
    return (
      <div className="AdminStudent-main-frame">
        <div className="AdminStudent-SideBar-main-frame">
         <AdminStudentSideBar />
        </div>
        <div className="AdminStudent-body-main-frame">
          <Route exact path="/adminaccount/student" component={AdminAddStudent} />
          <Route path = "/adminaccount/student/manualadd" component = {AdminAddStudentManual}/>
          <Route path = "/adminaccount/student/updatestudent" component = {AdminUpdateStudent} />
        </div>
      </div>
    );
  }
}
