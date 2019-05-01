import React from 'react';
import { getFromStorage, setInStorage } from '../../Util/LocalStorage';
import { AdminNav } from '../AdminNav/AdminNav';
import { Route } from 'react-router-dom';
import './AdminHome.css';
import { AdminAddStudent } from '../AdminAddStudent/AdminAddStudent';
import { AdminStudent } from '../AdminStudent/AdminStudent';
import { AdminFaculty } from '../AdminFaculty/AdminFaculty';
import { AdminFee } from '../AdminFee/AdminFee';
import smitheaderimage from '../../Util/Sikkim-Manipal-University.jpg';

class AdminSmitLogo extends React.Component {
  render() {
    return (
      <>
      <div className="outer">
        <div className="inner">
          <img src={smitheaderimage}/>
        </div>
      </div>
      <div className="AdminProjectDescr-main-frame">
        <h3>Student Information System</h3>
        <h5>Major Project 2019</h5>
        <h4>Under the guidance of Dr.Kalpana Sharma, Head of Department and Vikash Kumar Singh, Assistant Professor</h4>
        <h5>Department of Computer Science And Engineering</h5>
        <h5>Sikkim Manipal institute Of Technology</h5>
      </div>
      </>
    );
  }
}

export class AdminHome extends React.Component {
  render() {
    return (
      <div>
      <div className="admin-nav-bar-frame">
        <Route path="/adminaccount" render={(props)=>< AdminNav {...props}/>}/>
      </div>
      <div className="admin-home-main-frame">
        <Route exact path="/adminaccount" component= { AdminSmitLogo } />
        <Route path="/adminaccount/student" render={(props)=><AdminStudent />}/>
        <Route path="/adminaccount/faculty" component = { AdminFaculty } />
        <Route path="/adminaccount/fee" component = {AdminFee} />
      </div>
      </div>
    );
  }
}
