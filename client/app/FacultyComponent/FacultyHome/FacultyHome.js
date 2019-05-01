import React, { Component } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import { UpdateCourse } from '../UpdateCourse/UpdateCourse';
import { UpdatePassword } from '../UpdatePassword/UpdatePassword';
import { SideNavigationBar } from '../SideNavigationBar/SideNavigationBar';
import { UpdateMarks } from '../UpdateMarks/UpdateMarks';
import { FacultyRegistration } from '../FacultyRegistration/FacultyRegistration';
import { FacultyStudentDetail } from '../FacultyStudentDetail/FacultyStudentDetail';
import { setInStorage, getFromStorage } from '../../Util/LocalStorage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { FacultyQuiz } from '../FacultyQuiz/FacultyQuiz';
import { FacultySetCgpa } from '../FacultySetCgpa/FacultySetCgpa';
import smitheaderimage from '../../Util/Sikkim-Manipal-University.jpg';
import './FacultyHome.css';

export class FacultyHome extends Component {
  constructor(props) {
    super(props);
    this.state={
      empId: '',
      semester: '',
      sec: '',
      subjectcode: '',
      subjectdetail: []
    }

    this.formSideNavBar = this.formSideNavBar.bind(this);
  }

  formSideNavBar(semester, sec, subjectcode, subjectdetail) {
    this.setState({
      semester: semester,
      sec: sec,
      subjectcode: subjectcode,
      subjectdetail: subjectdetail
    }, ()=>{
      //console.log(this.state.semester);
      //console.log(this.state.sec);
      //console.log(this.state.subjectcode);
      //console.log(this.state.subjectdetail);
    });
  }

  render() {
    return (
      <div className="facultyhome-main-frame">
        <NavigationBar history={this.props.history} location={this.props.location}/>
        <div className='facultyhome-content-main-frame'>
          <SideNavigationBar formSideNavBar = {this.formSideNavBar} history={this.props.history} location={this.props.location} />
          <div className="faculty-home-frame">
            <div className="outer">
              <div className="inner">
                <img src={smitheaderimage}/>
              </div>
            </div>
            <Route path="/faculty/updatemarks" render={(props)=><UpdateMarks semester = {this.state.semester} sec={this.state.sec} subjectcode={this.state.subjectcode} subjectdetail={this.state.subjectdetail} {...props}/>}/>
            <Route path="/faculty/updatecourse" render={(props)=><UpdateCourse {...props}/>}/>
            <Route path="/faculty/viewStudentDetail" component={FacultyStudentDetail} />
            <Route path="/faculty/updatepassword" component = { UpdatePassword }/>
            <Route path="/faculty/registration" component={ FacultyRegistration } />
            <Route path="/faculty/setcgpa" component={ FacultySetCgpa } />
            <Route path="/faculty/quiz" component={FacultyQuiz} />
          </div>
        </div>
      </div>
    );
  }
}
