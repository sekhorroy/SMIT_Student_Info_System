import React from 'react';
import { Button, Table } from "react-bootstrap";

export class AdminFacultyViewAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: ''
    }

    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.generateFacultyDataTable = this.generateFacultyDataTable.bind(this);
  }

  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    });
  }

  onSearch() {
    if(!this.state.branch) {
      window.alert('Please select appropriate branch');
    } else {
      fetch('/api/adminaccount/getfacultydata', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          branch: this.state.branch
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          this.setState({
            jsonFacultyData: json.data
          }, ()=>{
            console.log(this.state.jsonFacultyData);
          });
        } else {
          window.alert('Fetching Faculty Data Failed');
        }
      });
    }
  }

  generateFacultyDataTable () {
    if(this.state.jsonFacultyData) {
      let row = this.state.jsonFacultyData.map((faculty, index)=>{
        let classesrow = faculty.classes.map((subject, index)=>{
          return (
            <td key={1000+index}>{subject.subjectcode} / {subject.semester} / {subject.sec}</td>
          )
        });
        return (
          <tr key={index}>
            <td>{faculty.empId}</td>
            {
              classesrow
            }
          </tr>
        );
      });

      return (
        <div className="Admin-Faculty-View-All-frame">
        <Table size="sm">
          <thead>
            <tr>
              <th>EMP ID</th>
              <th colSpan="6">CLASSES_DETAILS</th>
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
      <div className="AdminFacultyViewAll-main-frame">
        <div className="AdminFacultyViewAll-header-frame">
          <select className="browser-default custom-select" onChange={this.onChangeBranch}>
            <option>Select Branch</option>
            <option>CSE</option>
            <option>MECH</option>
            <option>EEE</option>
            <option>CE</option>
            <option>IT</option>
            <option>ECE</option>
          </select>
          <Button variant="outline-info" onClick = {this.onSearch}>Search</Button>
        </div>
        <div className="AdminFacultyViewAll-body-frame">
          {
            this.generateFacultyDataTable()
          }
        </div>
      </div>
    );
  }
}
