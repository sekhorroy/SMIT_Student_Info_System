import React from 'react';
import './UpdateMarks.css';
import { getFromStorage } from '../../Util/LocalStorage';
import { Button, Table } from 'react-bootstrap';

export class UpdateMarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: '',
      branch: '',
      sec: '',
      semester: ''
    }
    this.onChange = this.onChange.bind(this);
    this.generateSubjectTableData = this.generateSubjectTableData.bind(this);
    this.handleStudentDataTable = this.handleStudentDataTable.bind(this);
    this.onUpdateMarks = this.onUpdateMarks.bind(this);
  }

  componentDidMount() {
    const faculty_obj = getFromStorage('faculty_obj');
    const { branch } = faculty_obj;
  }

  /*
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.subjectdetail != nextProps.subjectdetail;
  }
  */

  generateSubjectTableData () {
    if(this.props.subjectdetail){
      let tableData = [];
      this.props.subjectdetail.forEach((student, index)=>{
        let oneRow = {
          id: student._id,
          regNo: student.regNo,
          [this.state.option]: student.subject[0][this.state.option]
        }
        tableData.push(oneRow);
      });
      //console.log(tableData);

      this.setState({
        tableData: tableData
      }, ()=>{
        console.log(this.state.tableData);
      });
    } else {
      console.log("here");
    }
  }

  handleStudentDataTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: Number(evt.target.value)
    };

    console.log(item);

    var tableData = this.state.tableData;
    var newTableData=[];
    tableData.map((student)=>{
      if(student.id == item.id) {
        student[this.state.option] = item.value;
      }
      newTableData.push(student);
    });

    this.setState({
      tableData: newTableData
    });

    //console.log(this.state.tableData);
    /*
    var products = this.state.products.slice();
      var newProducts = products.map(function(product) {

        for (var key in product) {
          if (key == item.name && product.id == item.id) {
            product[key] = item.value;
          }
        }
        return product;
      });
      this.setState({products:newProducts});
      //  console.log(this.state.products);
      */
  };

  generateSubjectTable() {
    if(this.state.tableData) {
      let row = this.state.tableData.map((student, index)=>{
        return (
          <tr key={index}>
            <td>{student.regNo}</td>
            <td><input type="text" name={this.state.option} id={student.id} defaultValue={student[this.state.option]} placeholder={student[this.state.option]} onChange={this.handleStudentDataTable}/></td>
          </tr>
        );
      });

      return (
        <Table bordered hover >
        <thead>
          <tr>
            <th>RegNo</th>
            <th>{this.state.option.toUpperCase()}</th>
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

  onChange(e) {
    this.setState({
      option: e.target.value
    }, ()=>{
      this.generateSubjectTableData();
    });
  }

  onUpdateMarks() {
    fetch('/api/facultyaccount/updateacademicmarks', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        option: this.state.option,
        jsonStudentAcademicData: this.state.tableData,
        subjectcode: this.props.subjectcode
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success){
        window.alert('Successfully updated');
      } else {
        window.alert('Update not Successfull');
      }
    });
  }

  render() {
    if(this.props.semester === "" || this.props.sec === "" || this.props.subjectcode === ""){
      return (
        <div className="warning-frame">
          <h3>PLEASE SELECT THE REQUIRED SEMESTER, SEC AND SUBJECTCODE OPTION</h3>
        </div>
      );
    }

    if(this.props.subjectdetail.length == 0) {
      return (
        <div className="warning-frame">
          <h3>NO STUDENT ALLOCATED IN THE SUBJECT: {this.props.subjectcode}</h3>
        </div>
      );
    }


    return (
      <div className="update-marks-main-frame">
        <div className="update-marks-header-frame">
          <h3>Internal Marks Update</h3>
          <hr/>
          <p><span className="update-marks-header-frame-detail">Semester: {this.props.semester}</span><span className="update-marks-header-frame-detail">Sec: {this.props.sec}</span><span className="update-marks-header-frame-detail">Subject-Code: {this.props.subjectcode}</span></p>
          <hr/>
        </div>
        <div className="update-marks-body-frame">
          <div className="marks-option">
          <label>Select marks field: </label>&nbsp;
          <select className="browser-default custom-select" value={this.state.option} onChange={this.onChange}>
            <option>Select</option>
            <option>assignment1</option>
            <option>assignment2</option>
            <option>quiz1</option>
            <option>quiz2</option>
            <option>sessional1</option>
            <option>sessional2</option>
            <option>attendance</option>
          </select>
          <Button onClick={this.onUpdateMarks}>Submit Marks</Button>
          </div>

        </div>
        <div className="update-marks-student-marks-frame">
          {
            this.generateSubjectTable()
          }
        </div>
      </div>
    );
  }
}
