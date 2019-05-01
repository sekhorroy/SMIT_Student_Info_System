import React from 'react';
import { getFromStorage } from '../../Util/LocalStorage';
import { Table, Button } from 'react-bootstrap';


export class FacultyRegistrationViewSubject extends React.Component {
  constructor(props) {
    super(props);
    this.generateSubjectTable = this.generateSubjectTable.bind(this);
    this.state = {
      subject: []
    }

    this.onDeleteSubject = this.onDeleteSubject.bind(this);
  }



  componentDidMount() {
    const faculty_obj = getFromStorage('faculty_obj');
    const { branch } = faculty_obj;
    const { empId } = faculty_obj;
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
          subject: json.data
        });
        console.log(json.data);
      } else {
        window.alert('Fetching data for subject detail failed');
      }
    });
  }

  onDeleteSubject(e) {
    e.preventDefault();

    const subjectcode = e.target.getAttribute('data-item');
    const faculty_obj = getFromStorage('faculty_obj');
    const { empId } = faculty_obj;

    fetch('/api/facultyaccount/deleteregistrationsubject', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        empId: empId,
        subjectcode: subjectcode
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        const row = this.state.subject.filter(subject=>{return subject.subjectcode != subjectcode })
        this.setState({
          subject: row
        });
      } else {
        window.alert('Failed');
      }
    });

  }

  generateSubjectTable() {
    if(this.state.subject.length != 0){
      let row = this.state.subject.map((subject, index)=>{
        return (
          <tr key={index}>
            <td>{subject.semester}</td>
            <td>{subject.sec}</td>
            <td>{subject.subjectname} / {subject.subjectcode}</td>
            <td><Button data-item={subject.subjectcode} onClick={this.onDeleteSubject}>Delete</Button></td>
          </tr>
        );
      });

      return (
        <div className="FacultyRegistrationView-table">
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Section</th>
            <th>SubjectName / SubjectCode</th>
            <th></th>
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



  render() {
    return (
      <div>
        {
          this.state.subject && this.generateSubjectTable()
        }
      </div>
    );
  }
}
