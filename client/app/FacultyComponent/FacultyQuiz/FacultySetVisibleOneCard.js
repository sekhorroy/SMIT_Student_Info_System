import React from 'react';
import { Checkbox, Button, Input } from 'semantic-ui-react';

export class FacultySetVisibleOneCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.quiz.isVisible,
      noofstudents: ''
    }
    this.onChangeVisibility = this.onChangeVisibility.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChangeNoOfStudent = this.onChangeNoOfStudent.bind(this);
    this.onSubmitNoOfStudents = this.onSubmitNoOfStudents.bind(this);
  }

  onChangeVisibility(e) {
    this.setState({
      isVisible: !this.state.isVisible
    }, ()=>{
      fetch('/api/facultyaccount/setvisibility', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          semester: this.props.quiz.semester,
          branch: this.props.quiz.branch,
          sec: this.props.quiz.sec,
          isVisible: this.state.isVisible
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {

        } else {
          window.alert('Failed to change visibility');
        }
      });
    });
  }

  onDelete() {
    fetch('/api/facultyaccount/deletequiz', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        semester: this.props.quiz.semester,
        branch: this.props.quiz.branch,
        sec: this.props.quiz.sec,
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        window.alert('Successfully deleted subject');
      } else {
        window.alert('Failed to change visibility');
      }
    });

  }

  onChangeNoOfStudent(e) {
    this.setState({
      noofstudents: e.target.value
    });
  }

  onSubmitNoOfStudents() {
    console.log(this.state.noofstudents);
    fetch('/api/facultyaccount/setnoofstudentsquiz', {
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        semester: this.props.quiz.semester,
        branch: this.props.quiz.branch,
        sec: this.props.quiz.sec,
        noofstudents: this.state.noofstudents
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        window.alert(json.message);
      } else {
        window.alert(json.message);
      }
    });
  }

  render() {
    return (
      <div className="FacultySetVisibleOneCard-frame">
        <div>
        <h2>Quiz Card</h2>
        <br/>
        <Button primary onClick={this.onDelete}>Delete</Button>
        <br/>
        </div>
        <h4>Semester- {this.props.quiz.semester}</h4>
        <h4>Branch- {this.props.quiz.branch}</h4>
        <p>Sec- {this.props.quiz.sec}</p>
        <label>Change Visibility &nbsp;</label>
        <Checkbox toggle label="."checked={this.state.isVisible === true} onChange={this.onChangeVisibility}/>
        <Input placeholder="No of students" onChange={this.onChangeNoOfStudent}/>
        <Button primary onClick={this.onSubmitNoOfStudents}>Change</Button>
      </div>
    );
  }
}
