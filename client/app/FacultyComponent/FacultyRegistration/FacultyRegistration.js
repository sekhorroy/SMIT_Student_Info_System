import React from 'react';
import './FacultyRegistration.css';
import { Button } from 'react-bootstrap';
import { getFromStorage } from '../../Util/LocalStorage';
import { FacultyRegistrationViewSubject } from './FacultyRegistrationViewSubject';

export class FacultyRegistration extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      semester: '',
      sec: '',
      subjectname: '',
      subjectcode: '',
    }

    this.onHandleSemester = this.onHandleSemester.bind(this);
    this.onHandleSec = this.onHandleSec.bind(this);
    this.getSubjectOption = this.getSubjectOption.bind(this);
    this.onHandleSubjectName = this.onHandleSubjectName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandleSemester(e) {
    this.setState({
      semester: e.target.value
    }, ()=>{
      const faculty_obj = getFromStorage('faculty_obj');
      const { branch } = faculty_obj;
      fetch('/api/facultyaccount/registrationgetsemdetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          semester: this.state.semester,
          branch: branch
        })
      })
      .then(res=>res.json())
      .then((json)=>{
        if(json.success) {
          this.setState({
            subject: json.data
          }, ()=>{
            console.log(this.state.semester);
          });
        } else {
          window.alert('There is some problem with fetching subject detail');
        }
      });
    });
  }

  getSubjectOption() {

    if(this.state.subject) {
      let items = [];
      let index2;
      this.state.subject.subject.forEach((subject, index)=>{
        items.push(<option key={index} value={subject.subjectname}>{subject.subjectname}</option>);
        index2 = index+1;
      });

      this.state.subject.electivesubject.forEach((subject, index)=>{
        items.push(<option key={index+index2} value={subject.subjectname}>{subject.subjectname}</option>);
      });
      return items;
    } else {
      return null;
    }
  }

  onHandleSec(e) {
    this.setState({
      sec: e.target.value
    });
  }

  onHandleSubjectName(e) {
    this.setState({
      subjectname: e.target.value
    }, ()=>{
      console.log(this.state.subjectname);
    });

    let subject = this.state.subject.subject.filter(subject=>subject.subjectname == e.target.value);
    if(subject.length === 0 ){
       subject = this.state.subject.electivesubject.filter(subject=>subject.subjectname == e.target.value);
    }
    if(subject.length>0){
      this.setState({
        subjectcode: subject[0].subjectcode
      }, ()=>{
        console.log(this.state.subjectcode);
      });
    }
  }

  onHandleSubjectCode(e) {
    let subject = this.state.subject.subject.filter(subject=>subject.subjectname == e.target.value);
    if(subject.length === 0 ){
       subject = this.state.subject.electivesubject.filter(subject=>subject.subjectname == this.state.subjectname);
    }
  }

  onSubmit() {
    const faculty_obj = getFromStorage('faculty_obj');
    console.log(faculty_obj.empId);
    console.log(faculty_obj.branch);

    fetch('/api/facultyaccount/registration', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        empId: faculty_obj.empId,
        branch: faculty_obj.branch,
        semester: this.state.semester,
        sec: this.state.sec,
        subjectname: this.state.subjectname,
        subjectcode: this.state.subjectcode
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        window.alert("successfully added subject");
      } else {
        window.alert("Subject Could not be Added");
      }
    });
  }

  render() {
    return (
      <div className="faculty-registration-main-frame">
        <div className="faculty-registration-input-frame">
          <div className="faculty-select-option-frame">
            <label>Select Semester</label>
            <select className="browser-default custom-select" value={this.state.semester} onChange={this.onHandleSemester}>
              <option>Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <span className="label-select-gap"></span><label>Select Section</label>
            <select className="browser-default custom-select"  value={this.state.sec} onChange={this.onHandleSec}>
              <option>Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
            <label>Select SubjectName</label>
            <select className="browser-default custom-select" value={this.state.subjectname} onChange={this.onHandleSubjectName}>
              <option>Select SubjectName</option>
              {
                this.getSubjectOption()
              }
            </select>
            <label>Select SubjectCode</label>
            <input type="text" className="browser-default custom-select" value={this.state.subjectcode} disabled/>
            <div className="faculty-registration-btn">
              <Button onClick={this.onSubmit}>ClicK To Add</Button>
            </div>
          </div>
        </div>
        <div className="faculty-registration-display-frame">
          <div className="faculty-registration-display-table">
            <div className="faculty-registration-display-table-header">
              <h4>View Registered Subject</h4>
            </div>
            <FacultyRegistrationViewSubject />
          </div>
        </div>
      </div>
    );
  }
}
