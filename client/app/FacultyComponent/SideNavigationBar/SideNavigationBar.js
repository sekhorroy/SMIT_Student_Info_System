import React from 'react';
import { Nav } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import './SideNavigationBar.css'
import { withRouter } from 'react-router-dom';
import { getFromStorage } from '../../Util/LocalStorage';

export class SideNavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      semester: '',
      sec: '',
      branch: '',
      subjectcode: '',
      subjectoptions: []
    }

    this.onHandleChangeSemester = this.onHandleChangeSemester.bind(this);
    this.onHandleChangeSection = this.onHandleChangeSection.bind(this);
    this.onHandleChangeSubject = this.onHandleChangeSubject.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.generateSemesterOptions = this.generateSemesterOptions.bind(this);
    this.generateSubjectOption = this.generateSubjectOption.bind(this);
  }

  componentDidMount() {
    const faculty_obj = getFromStorage('faculty_obj');
    const { branch } = faculty_obj;
    const { empId } = faculty_obj;

    this.setState({
      branch: branch
    });

    fetch('/api/facultyaccount/getregistrationsubjectdetail', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        empId: empId,
        branch: branch
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        this.setState({
          subjectoptions: json.data
        });
      } else {
        //window.alert('Fetching data for subject detail failed');
      }
    });
  }

  onHandleChangeSemester(e) {
    this.setState({
      semester: e.target.value
    }, ()=>{
      this.generateSectionOption();
    });
  }

  onHandleChangeSection(e) {
    this.setState({
      sec: e.target.value
    });
  }

  onHandleChangeSubject(e) {
    this.setState({
      subjectcode: e.target.value
    });
  }

  onSearch() {
    if(this.state.semester == '' || this.state.sec == '' || this.state.subjectcode == '' ){
      window.alert('Please select the valid options to update internal marks');
      return;
    }

    fetch('/api/facultyaccount/getacademicresult', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        semester: this.state.semester,
        sec: this.state.sec,
        branch: this.state.branch,
        subjectcode: this.state.subjectcode
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success){
        this.props.formSideNavBar(this.state.semester, this.state.sec, this.state.subjectcode, json.data);
      } else {
        console.log('failed');
      }
    });

    //this.props.formSideNavBar(this.state.semester, this.state.sec, this.state.subjectcode, this.state.subjectdetail);
    const { from } = this.props.location.state || { from:  { pathname: "/faculty/updatemarks"}};
    this.props.history.push(from);
  }

  generateSemesterOptions() {
      let item = [];
      this.state.subjectoptions.forEach((subject, index)=>{
        item.push(<option key={index} value={subject.semester}>{subject.semester}</option>)
      });

      return item;
  }

  generateSectionOption() {
    let item = [];
    let subject = this.state.subjectoptions.filter(subject=>subject.semester == this.state.semester);

    subject.forEach((subject, index)=>{
      item.push(<option key={index} value={subject.sec}>{subject.sec}</option>)
    });
    return item;
  }

  generateSubjectOption() {
    let item = [];
    let subject = this.state.subjectoptions.filter(subject=>subject.semester == this.state.semester && subject.sec === this.state.sec);

    subject.forEach((subject, index)=>{
      item.push(<option key={index} value={subject.subjectcode}>{subject.subjectname}</option>)
    });
    return item;
  }

  render(){
    return (
      <div className="sidenav-main-frame">
        <div className="search-main-frame">
          <label>Select Semester</label>
          <select className="browser-default custom-select" value={this.state.semester} onChange={this.onHandleChangeSemester}>
            <option>Semester</option>
            {
              this.generateSemesterOptions()
            }
          </select>
          <label>Select Section</label>
          <select className="browser-default custom-select" value={this.state.sec} onChange={this.onHandleChangeSection}>
            <option>Section</option>
            {
              this.generateSectionOption()
            }
          </select>
          <label>Select Subject</label>
          <select className="browser-default custom-select" value={this.state.subjectcode} onChange={this.onHandleChangeSubject}>
            <option>Select Subject</option>
            {
              this.generateSubjectOption()
            }
          </select>
          <Button primary onClick={this.onSearch}><i className="fas fa-search"></i> Search</Button>
        </div>
        <div className="more-options-frame">
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/faculty/viewStudentDetail"><i className="fas fa-user-check"></i> Student Details</Nav.Link>
            </Nav>
          </div>
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/faculty/updatecourse"><i className="fas fa-cogs"></i> Advance Options</Nav.Link>
            </Nav>
          </div>
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/faculty/quiz"><i className="fas fa-tasks"></i> Quiz Options</Nav.Link>
            </Nav>
          </div>
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/faculty/setcgpa"><i className="fas fa-tasks"></i> Set CGPA</Nav.Link>
            </Nav>
          </div>
          <hr/>
          <div className="more-options-frame-btn">
            <Nav className="mr-auto">
              <Nav.Link href="/faculty/updatepassword"><i className="fas fa-user-shield"></i> Update Password</Nav.Link>
            </Nav>
          </div>
          <hr/>
        </div>
      </div>
      );
  }
}
