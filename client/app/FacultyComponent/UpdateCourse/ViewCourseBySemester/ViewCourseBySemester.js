import React, { Component } from 'react';
import 'babel-polyfill';
import './ViewCourseBySemester.css';
import { getFromStorage } from '../../../Util/LocalStorage';
import { Tabs, Tab } from 'react-bootstrap';
import { Table, Button } from 'react-bootstrap';

export class ViewCourseBySemester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: [],
      fetcherror: '',
    }

     this.generateSubject = this.generateSubject.bind(this);
     this.generateElectiveSubject = this.generateElectiveSubject.bind(this);
     this.generateLabSubject = this.generateLabSubject.bind(this);
     this.onDeleteSubject = this.onDeleteSubject.bind(this);
     this.onDeleteElectiveSubject = this.onDeleteElectiveSubject.bind(this);
     this.onDeleteLab = this.onDeleteLab.bind(this);
  }

  async componentDidMount() {
      const branch = getFromStorage('faculty_obj').branch;

      const response = await fetch('/api/facultyaccount/getsubjectsbysemester', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          semester: this.props.semester,
          branch: branch
        }),
      });

      const json = await response.json();

      if(json.success) {
        this.setState({
          subject: json.data
        });
      } else {
        this.setState({
          fetcherror: json.message
        });
      }

      //console.log(this.props.semester);
  /*
      fetch('api/facultyaccount/getsubjectsbysemester', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          semester: semester,
          branch: branch
        }),
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success){

        } else {

        }
      });
      */
    //  console.log(this.props.semester);
    //  console.log(this.state.subject);
  }

  onDeleteLab(e) {
    e.preventDefault();

    const subjectcode = e.target.getAttribute('data-item');
    const semester = this.props.semester;
    const branch = getFromStorage('faculty_obj').branch;

    console.log(subjectcode, semester, branch)

    fetch('/api/facultyaccount/deletelabs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coursecode: subjectcode,
        semester: semester,
        branch: branch
      })
    })
    .then(res=>res.json())
    .then(json=> {
      if(json.success){
        console.log(json.message);
        const row = this.state.subject.lab.filter(subject=> {return subject.subjectcode!==subjectcode});
        this.setState({
          subject: {
            lab: row
          }
        });
      } else {
        console.log('not successfull');
      }
    });
  }

  onDeleteSubject(e) {
    e.preventDefault();

    const subjectcode = e.target.getAttribute('data-item');
    const semester = this.props.semester;
    const branch = getFromStorage('faculty_obj').branch;


    fetch('/api/facultyaccount/deletecourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coursecode: subjectcode,
        semester: semester,
        branch: branch
      })
    })
    .then(res=>res.json())
    .then(json=> {
      if(json.success){
        console.log(json.message);
        const row = this.state.subject.subject.filter(subject=> {return subject.subjectcode!==subjectcode});
        this.setState({
          subject: {
            subject: row
          }
        });
      } else {
        console.log('not successfull');
      }
    });
  }

  onDeleteElectiveSubject(e) {
    e.preventDefault();
    const subjectcode = e.target.getAttribute('data-item');
    const semester = this.props.semester;
    const branch = getFromStorage('faculty_obj').branch;


    fetch('/api/facultyaccount/deleteelectivecourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coursecode: subjectcode,
        semester: semester,
        branch: branch
      })
    })
    .then(res=>res.json())
    .then(json=> {
      if(json.success){
        console.log(json.message);
        const row = this.state.subject.electivesubject.filter(subject=>subject.subjectcode!==subjectcode);
        this.setState({
          subject: {
            electivesubject: row
          }
        });
      } else {
        console.log('not successfull');
      }
    });


  }

  generateSubject() {
    if(this.state.subject.subject){
      let row = this.state.subject.subject.map((subject, index)=>{
        return(
          <tr key={index}>
            <td>{subject.subjectname}</td>
            <td>{subject.subjectcode}</td>
            <td><Button data-item={subject.subjectcode} onClick={this.onDeleteSubject}>Delete</Button></td>
          </tr>
        );
      });

      return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
        {
          row
        }
        </tbody>
        </Table>
      );
    } else {
      return null;
    }
  }

  generateElectiveSubject() {
    if(this.state.subject.electivesubject){
      let row = this.state.subject.electivesubject.map((subject, index)=>{
          return (
            <tr key={index}>
              <td>{subject.subjectname}</td>
              <td>{subject.subjectcode}</td>
              <td>{subject.seatsavailable}</td>
              <td><Button data-item={subject.subjectcode} onClick={this.onDeleteElectiveSubject}>Delete</Button></td>
            </tr>
          );
      });

          return (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Seats Allocated</th>
              </tr>
            </thead>
            <tbody>
            {
              row
            }
            </tbody>
            </Table>
          );
    } else {
      return null;
    }
  }

  generateLabSubject() {
    if(this.state.subject.lab){
      let row = this.state.subject.lab.map((subject, index)=>{
        return(
          <tr key={index}>
            <td>{subject.subjectname}</td>
            <td>{subject.subjectcode}</td>
            <td><Button data-item={subject.subjectcode} onClick={this.onDeleteLab}>Delete</Button></td>
          </tr>
        );
      });

      return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
        {
          row
        }
        </tbody>
        </Table>
      );
    } else {
      return null;
    }
  }

  render() {
    //const subject = this.state.subject.subject;
    //const electivesubject = this.state.subject.electivesubject;

    return (
      <div className="faculty-view-course-main-frame">
        <Tabs defaultActiveKey="CompulsoryCourse">
          <Tab eventKey="CompulsoryCourse" title="Regular Subjects">
            <div className="subject-list-frame">
              {
                this.generateSubject()
              }
            </div>
          </Tab>
          <Tab eventKey="ElectiveCourse" title="Elective Subjects">
            <div className="subject-list-frame">
              {
                this.generateElectiveSubject()
              }
            </div>
          </Tab>
          <Tab eventKey="LabCourse" title="Labs">
            <div className="subject-list-frame">
              {
                this.generateLabSubject()
              }
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
