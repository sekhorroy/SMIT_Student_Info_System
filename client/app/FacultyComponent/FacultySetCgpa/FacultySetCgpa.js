import React from 'react';
import './FacultySetCgpa.css';
import { Button } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import { Icon, Label, Menu, Table, Input } from 'semantic-ui-react'

class MyVerticallyCenteredModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      academicdetail: []
    }
    this.generateDefaulterList = this.generateDefaulterList.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onUpdateCgpa = this.onUpdateCgpa.bind(this);
  }


  onUpdateCgpa() {
    fetch('/api/facultyaccount/updatestudentcgpa', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        jsonAcademicDetail: this.props.academicdetail
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


  onHandleChange(e) {
    let item = {
      id: e.target.id,
      name: e.target.name,
      value: e.target.value
    }

    this.props.academicdetail.forEach((student)=>{
      if(student._id === item.id) {
        student[item.name] = Number(item.value);
      }
    });
  }



  generateDefaulterList() {
    //console.log(this.props.feedetail);
    if(this.props.academicdetail) {
        let item = [];
        this.props.academicdetail.forEach((student, index)=>{
            item.push(
              <Table.Row key={index}>
                <Table.Cell>
                  <Label ribbon>{index+1}</Label>
                </Table.Cell>
                <Table.Cell>{student.regNo}</Table.Cell>
                <Table.Cell>{student.sec}</Table.Cell>
                <Table.Cell><Input type="text" id={student._id} name="cgpa" defaultValue={student.cgpa} onChange={this.onHandleChange}/></Table.Cell>
              </Table.Row>
            );
        });
        return item;
    } else {
      return null;
    }

  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
         id="print-table-student-list"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Set Cgpa- Branch: {this.props.branch} Semester: {this.props.semester}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="FacultyDepartmentCheckDefault-modal-main">
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sl.No</Table.HeaderCell>
                <Table.HeaderCell>RegNo</Table.HeaderCell>
                <Table.HeaderCell>Sec</Table.HeaderCell>
                <Table.HeaderCell>CGPA</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.generateDefaulterList()
              }
            </Table.Body>
          </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button primary onClick={()=>{
             let divToPrint=document.getElementById("print-table-student-list");
             let newWin = window.open("");
             var htmlToPrint = '' +
               '<style type="text/css">' +
               'table th, table td {' +
               'border:1px solid;' +
               '}' +
               '</style>';
             htmlToPrint += divToPrint.outerHTML;
             newWin.document.write(htmlToPrint);
             newWin.print();
             newWin.close();
          }}>Print</Button>
          <Button primary onClick={this.onUpdateCgpa}>Update CGPA</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export class FacultySetCgpa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: '',
      branch: '',
      modalShow: false,
      feedetail: []
    }
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onGenerateList = this.onGenerateList.bind(this);
  }

  onChangeSemester(e) {
    this.setState({
      semester: e.target.value
    }, ()=>{
      console.log(this.state.semester);
    });
  }

  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    }, ()=>{
      console.log(this.state.branch);
    });
  }

  onGenerateList() {
    fetch('/api/facultyaccount/setcgpa', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        semester: this.state.semester,
        branch: this.state.branch
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        this.setState({
          academicdetail: json.data,
          modalShow: true
        }, ()=>{
          console.log(this.state.academicdetail);
        });
      } else {
        window.alert(json.message);
      }
    });
  }


  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="FeeDepartmentCheckDefaulter-main-frame">
        <div  className="FeeDepartmentCheckDefaulter-header-frame">
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
          <select  className="browser-default custom-select" onChange={this.onChangeBranch}>
            <option value="">Branch</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="CE">CE</option>
            <option value="MECH">MECH</option>
          </select>
          <Button primary onClick={this.onGenerateList}>Set Cgpa</Button>
        </div>
        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          academicdetail = {this.state.academicdetail}
          onHide={modalClose}
          branch={this.state.branch}
          semester = {this.state.semester}
        />
      </div>
    );
  }
}
