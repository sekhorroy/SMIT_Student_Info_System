import React from 'react';
import { Button } from 'react-bootstrap';

export class AdminAddStudentManual extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      regNo: '',
      course: '',
      semester: '',
      branch: '',
      sec: '',
      tg: '',
      tg_contact: ''
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRegNo = this.onChangeRegNo.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeSec = this.onChangeSec.bind(this);
    this.onChangeTg = this.onChangeTg.bind(this);
    this.onChangeTgContact = this.onChangeTgContact.bind(this);
    this.submitStudentData = this.submitStudentData.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeRegNo(e) {
    this.setState({
      regNo: e.target.value
    });
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    });
  }

  onChangeSemester(e) {
    this.setState({
      semester: e.target.value
    });
  }

  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    });
  }

  onChangeSec(e) {
    this.setState({
      sec: e.target.value
    });
  }

  onChangeTg(e) {
    this.setState({
      tg: e.target.value
    });
  }

  onChangeTgContact(e) {
    this.setState({
      tg_contact: e.target.value
    });
  }

  submitStudentData() {
    console.log(this.state.name);
    console.log(this.state.regNo);
    console.log(this.state.course);
    console.log(this.state.semester);
    console.log(this.state.branch);
    console.log(this.state.sec);
    console.log(this.state.tg);
    console.log(this.state.tg_contact);
    if(this.state.name && this.state.regNo && this.state.course && this.state.semester && this.state.branch && this.state.sec) {
      fetch('/api/adminaccount/insertnewstudentdetailmanual', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          regNo: this.state.regNo,
          course: this.state.course,
          semester: this.state.semester,
          branch: this.state.branch,
          sec: this.state.sec,
          tg: this.state.tg,
          tg_contact: this.state.tg_contact
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          window.alert('successfully registered');
        } else {
          window.alert(json.message);
        }
      });
    } else {
      window.alert('Please enter the detail needed to complete registration');
    }
  }

  render() {
    return (
      <div className="AdminAddStudentManual-main-frame">
        <div className="AdminAddStudentManual-header-frame">
          <h3>Add Student Manually</h3>
        </div>
        <div className="AdminAddStudentManual-body-frame">
          <label>Name:</label>
          <input type="text" className="browser-default custom-select" onChange={this.onChangeName} required/>
          <label>Registration No:</label>
          <input type="text" className="browser-default custom-select" onChange={this.onChangeRegNo} required/>
          <label>Course:</label>
          <select  className="browser-default custom-select" onChange={this.onChangeCourse}>
            <option value="">Select Course</option>
            <option value="Btech">Btech</option>
          </select>
          <label>Branch:</label>
          <select  className="browser-default custom-select" onChange={this.onChangeBranch}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="EEE">EEE</option>
            <option value="CE">CE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
          </select>
          <label>Semester:</label>
          <select  className="browser-default custom-select" onChange={this.onChangeSemester}>
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <label>Sec:</label>
          <select  className="browser-default custom-select" onChange={this.onChangeSec}>
            <option value="">Select Sec</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
          </select>
          <label>TG:</label>
          <input type="text" className="browser-default custom-select" onChange={this.onChangeTg}/>
          <label>TG_Contact:</label>
          <input type="text" className="browser-default custom-select" onChange={this.onChangeTgContact}/>
          <div className="AdminAddStudentManual-btn">
            <Button onClick={this.submitStudentData}>Submit Student Data</Button>
          </div>
        </div>
      </div>
    );
  }
}
