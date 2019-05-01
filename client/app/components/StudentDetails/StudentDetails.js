import React, { Component } from 'react';
import './StudentDetails.css';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../Util/LocalStorage';
import { Table } from 'react-bootstrap';
import { StudentAcademicDetail } from './StudentAcademicDetail';

class StudentDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      jsonReturnedValue: [],
      errorStatus: '',
      subjects: [],
      labs: []
    }
  }

  componentDidMount() {
    this._isMounted=true;
      const studentObj = this.props.studentObj;
      const { regNo } = studentObj;
      //console.log(regNo);
      if(this._isMounted && regNo) {
      fetch('/api/account/getonestudentacademicdetail?regNo='+regNo)
      .then(res => res.json())
      .then(json => {
        if(json.success){

          this.setState({
            jsonReturnedValue: json.data,
            subjects: json.data.subject,
            labs: json.data.lab
          })
          //console.log(this.state.jsonReturnedValue);
          //console.log(this.state.subjects);
          //console.log(this.state.labs);
          setInStorage('student_academic_details', {academicObj: this.state.jsonReturnedValue});

        } else {
          console.log(json);
          this.setState({
            errorStatus: json.message
          })
          console.log('failed to fetch the student academic results');
        }
      });
      }
  }

  componentWillUnMount(){
    this._isMounted=false;
  }

  render() {
    const studentObj = this.props.studentObj;
    console.log(this.props.studentObj);
    return (
      <div className="student-detail-main-frame">
        <div className="student-detail-frame">
          <div className="student-detail-body">
          <Table>
            <thead>
              <tr>
                <th colSpan="2">Personal Details</th>
              </tr>
              <tr>
                <th colSpan="2"><h4>{studentObj.name}</h4></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RegNo</td>
                <td>{studentObj.regNo}</td>
              </tr>
              <tr>
                <td>COURSE</td>
                <td>{studentObj.course}</td>
              </tr>
              <tr>
                <td>SEMESTER</td>
                <td>{studentObj.currentsem}</td>
              </tr>
              <tr>
                <td>TG</td>
                <td>{studentObj.tg}</td>
              </tr>
              <tr>
                <td>TG_CONTACT</td>
                <td>{studentObj.tg_contact}</td>
              </tr>
            </tbody>
          </Table>
          </div>
        </div>
        <StudentAcademicDetail subjects={this.state.subjects} labs={this.state.labs}/>
      </div>
    );
  }
};

export default StudentDetails;

/*
<div className="student-result-card">
  <div className="student-result-card-header">
    {subject.subjectname}-{subject.subjectcode}
  </div>
  <div className="student-result-card-attendance">
  </div>
  <div className="student-result-card-body">
    <p>Quiz1: {subject.quiz1}</p>

    <p>Quiz2: {subject.quiz2}</p>

    <p>Assignment1: {subject.assignment1}</p>

    <p>Assignment2: {subject.assignment2}</p>

    <p>Sessional 1: {subject.sessional1}</p>

    <p>Sessional 2: {subject.sessional2}</p>
  </div>
</div>
*/
