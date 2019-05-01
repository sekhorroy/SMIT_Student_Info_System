import React from 'react';
import './FacultyStudentDetail.css';
import { Button, Table } from 'react-bootstrap';

export class FacultyStudentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regNo: '',
      isLoading: false
    }
    this.handleRegNoChange = this.handleRegNoChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.showStudentDetail = this.showStudentDetail.bind(this);
    this.showAcademicDetail = this.showAcademicDetail.bind(this);
    this.generateChoosenElective = this.generateChoosenElective.bind(this);
  }

  handleRegNoChange(e) {
    this.setState({
      regNo: e.target.value
    });
  }

  onSearch() {
    fetch('/api/facultyaccount/checkstudentdetails', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        regNo: this.state.regNo
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        this.setState({
          studentdata: json.studentdata,
          academicdetail: json.academicdetail
        }, ()=>{
          console.log(this.state.studentdata);
          console.log(this.state.academicdetail);
        });
      } else {
        window.alert('Student Data Searched doesnot exist');
      }
    });
  }

  showStudentDetail() {
    if(this.state.studentdata && this.state.academicdetail) {
      return (
        <div>
        <Table>
          <thead>
            <tr>
              <th colSpan="3">STUDENT DETAILS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span>NAME:</span></td>
              <td>{this.state.studentdata.name}</td>
            </tr>
            <tr>
              <td><span>RegNo:</span></td>
              <td>{this.state.studentdata.regNo}</td>
            </tr>
            <tr>
              <td><span>COURSE:</span></td>
              <td>{this.state.studentdata.course}</td>
            </tr>
            <tr>
              <td><span>BRANCH: </span></td>
              <td>{this.state.studentdata.branch}</td>
            </tr>
            <tr>
              <td><span>SEMESTER: </span></td>
              <td>{this.state.studentdata.currentsem}</td>
            </tr>
            <tr>
              <td><span>sec: </span></td>
              <td>{this.state.academicdetail.sec}</td>
            </tr>
            <tr>
              <td><span>CGPA: </span></td>
              <td>{this.state.academicdetail.cgpa}</td>
            </tr>
            <tr>
              <td><span>TG: </span></td>
              <td>{this.state.studentdata.tg}</td>
            </tr>
            <tr>
              <td><span>TG_CONTACT: </span></td>
              <td>{this.state.studentdata.tg_contact}</td>
            </tr>
          </tbody>
        </Table>
        </div>
      );
    } else {
      return null;
    }
  }

  showAcademicDetail() {
    if(this.state.academicdetail) {
      let row = this.state.academicdetail.subject.map((subject, index)=>{
        return (
          <tr key={index}>
            <td>{subject.subjectname} - {subject.subjectcode}</td>
            <td>{subject.assignment1}</td>
            <td>{subject.assignment2}</td>
            <td>{subject.quiz1}</td>
            <td>{subject.quiz2}</td>
            <td>{subject.sessional1}</td>
            <td>{subject.sessional2}</td>
            <td>{subject.attendance}</td>
          </tr>
        );
      });
      return (
        <div>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th colSpan="8">STUDENT ACADEMIC DETAILS</th>
              </tr>
              <tr>
                <th>SubjectDetails</th>
                <th>Assignment1</th>
                <th>Assignment2</th>
                <th>Quiz1</th>
                <th>Quiz2</th>
                <th>Sessional1</th>
                <th>Sessional2</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {
                row
              }
            </tbody>
          </Table>
        </div>
      );
    } else {
      return null;
    }
  }

  generateChoosenElective() {
    if(this.state.academicdetail){
      let row = this.state.academicdetail.chooseelective.map((subject, index)=>{
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{subject.subjectname} - {subject.subjectcode}</td>
          </tr>
        );
      });

      return(
      <Table bordered size="sm">
        <thead>
          <tr>
            <th colSpan="2">Elective Preferance Detail</th>
          </tr>
          <tr>
            <th>Priority</th>
            <th>Elective Subject Detail</th>
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
    return (
      <div className="Faculty-Student-Detail-main-frame">
        <div className="Faculty-Student-Detail-main-frame-header-frame">
          <input type="text" value={this.state.regNo} placeholder="Enter RegNo to Search" onChange={this.handleRegNoChange}/>
          <Button variant="outline-info" onClick={this.onSearch}><i class="fas fa-search"></i> Search</Button>
        </div>
        <div className="Faculty-Student-Detail-main-frame-body-frame">
          <div className="Faculty-Student-Detail-frame">
          {
            this.showStudentDetail()
          }
          </div>
          <div className="Faculty-Academic-Student-Detail-frame">
          {
            this.showAcademicDetail()
          }
          <div>
          {
            this.generateChoosenElective()
          }
          </div>
          </div>
        </div>

      </div>
    );
  }
}
