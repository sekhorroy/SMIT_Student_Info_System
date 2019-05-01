import React from 'react';
import { Route } from 'react-router-dom';
import { AdminFacultySideBar } from './AdminFacultySideBar';
import { AddFaculty } from  './AddFaculty';
import { AdminFacultyViewAll } from './AdminFacultyViewAll';
import { AdminFacultyRemove } from './AdminFacultyRemove';
import './AdminFaculty.css';

export class AdminFaculty extends React.Component {
  render() {
    return (
      <div className="AdminFaculty-main-frame">
        <div className="AdminFaculty-SideBar-main-frame">
         <AdminFacultySideBar />
        </div>
        <div className="AdminFaculty-body-main-frame">
          <Route exact path="/adminaccount/faculty" component={AddFaculty}/>
          <Route path="/adminaccount/faculty/view-all" component = {AdminFacultyViewAll} />
          <Route path="/adminaccount/faculty/removefaculty" component={AdminFacultyRemove} />
        </div>
      </div>
    );
  }
}
