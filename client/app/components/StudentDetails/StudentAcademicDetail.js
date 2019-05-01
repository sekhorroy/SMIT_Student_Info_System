import React, { Component } from 'react';
import './StudentDetails.css';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../Util/LocalStorage';
import { Table } from 'react-bootstrap';
import { Progress } from 'semantic-ui-react';


export class StudentAcademicDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      subjects: [],
      labs: []
    }
  }

  render() {
    const studentObj = this.props.studentObj;
    //console.log(this.props.labs);
    return (
        <div className="student-academic-detail-frame">
        <Table bordered size="sm">
        <thead>
        <tr>
          <th colSpan="9">Regular Subject Detail</th>
        </tr>
        <tr>
          <th>SubjectCode</th>
          <th>Quiz1</th>
          <th>Quiz2</th>
          <th>Assignment1</th>
          <th>Assignment2</th>
          <th>Sessional1</th>
          <th>Sessional2</th>
          <th>Attendance</th>
          <th>FinalSem</th>
        </tr>
        </thead>
        <tbody>
          {
            this.props.subjects.map((subject, index) => {
              return (
                <tr key={index}>
                  <th>{subject.subjectcode}</th>
                  <th>{subject.quiz1}</th>
                  <th>{subject.quiz2}</th>
                  <th>{subject.assignment1}</th>
                  <th>{subject.assignment2}</th>
                  <th>{subject.sessional1}</th>
                  <th>{subject.sessional2}</th>
                  <th>{subject.attendance}<Progress percent={100} error>
            There was an error
          </Progress></th>
                  <th>{subject.finalsem}</th>
                </tr>
              );
            })
          }
          </tbody>
          </Table>
          <div className="lab-detail-table">
            <Table bordered size="sm">
            <thead>
              <tr>
                <th colSpan="4">Lab Detail</th>
              </tr>
              <tr>
                <th>Lab Code</th>
                <th>InternalMarks</th>
                <th>ExternalMarks</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.labs.map((lab, index)=>{
                  return (
                    <tr key={index}>
                      <th>{lab.labcode}</th>
                      <th>{lab.internalmarks}</th>
                      <th>{lab.externalmarks}</th>
                      <th>{lab.attendance}</th>
                    </tr>
                  );
                })
              }
            </tbody>
            </Table>
          </div>
        </div>
    );
  }
};
