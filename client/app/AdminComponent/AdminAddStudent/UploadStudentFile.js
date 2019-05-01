import React from 'react';
import './AdminAddStudent.css';
//import ExcelToJson from 'convert-excel-to-json';
import { Table } from 'react-bootstrap';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
export class UploadStudentFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datatable_columns: [{
                  label: 'Name',
                  field: 'name',
                  sort: 'asc',
                  width: 200
                }, {
                  label: 'RegNo',
                  field: 'regNo',
                  sort: 'asc',
                  width: 200
                }, {
                  label: 'Course',
                  field: 'course',
                  sort: 'asc',
                  width: 100
                }, {
                  label: 'Semester',
                  field: 'currentsem',
                  sort: 'asc',
                  width: 100,
                }, {
                  label: 'Section',
                  field: 'sec',
                  sort: 'asc',
                  width: 100
                }, {
                  label: 'Branch',
                  field: 'branch',
                  sort: 'asc',
                  width: 200
                }, {
                  label: 'TG',
                  field: 'tg',
                  sort: 'asc',
                  width: 150
                }, {
                  label: 'TG_CONTACT',
                  field: 'tg_contact',
                  sort: 'asc',
                  width: 200
                }],
      }

    this.fileHandler = this.fileHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.generateTable = this.generateTable.bind(this);
  }

  fileHandler(e) {
    let fileObj = e.target.files[0];
    /*
    const result = ExcelToJson({
      source: fs.readFileSync(fileObj)
    });
    */
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);
      }
      else{
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        }, ()=>{
          this.state.rows.splice(0, 1);
          this.generateJson(this.state.rows);
        });
      }
    });


  }

  handleClick() {

    console.log(this.state.jsonStudentData);

    fetch('/api/adminaccount/insertnewstudentdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonStudentData: this.state.jsonStudentData,
        jsonStudentAcademicData: this.state.jsonStudentAcademicData,
        jsonStudentFeeDetail: this.state.jsonStudentFeeDetail
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        window.alert('Success');
        console.log("Success");
      } else {
        window.alert('Failed');
        console.log("Failed");
        console.log(json.data);
      }
    });
  }

  generateTable() {
    if(this.state.jsonStudentData){
      //console.log(this.state.jsonStudentData);
      let row = this.state.jsonStudentData.map((student, index)=>{
        return (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.regNo}</td>
            <td>{student.course}</td>
            <td>{student.currentsem}</td>
            <td>{student.branch}</td>
            <td>{student.sec}</td>
            <td>{student.tg}</td>
            <td>{student.tg_contact}</td>
          </tr>
        );
      });
      return (
        <div className="show-file-body-frame">
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>REGNO</th>
              <th>COURSE</th>
              <th>SEMESTER</th>
              <th>BRANCH</th>
              <th>SEC</th>
              <th>TG</th>
              <th>TG_CONTACT</th>
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

  generateJson(studentarray) {
    let jsonStudent = [];
    let jsonStudentData=[];
    let jsonStudentAcademicData=[];
    let jsonStudentFeeDetail=[];
    if(this.state.rows) {
      this.state.rows.forEach((student)=>{
        let studentjson= {
          name: student[0],
          regNo: student[1],
          course: student[2],
          currentsem: student[3],
          sec: student[4],
          branch: student[5],
          tg: student[6],
          tg_contact: student[7],
        }

        let studentinfo = {
          regNo: student[1],
          password: 'password'
        }

        let studentacademic = {
          regNo: student[1],
          currentsem: student[3],
          sec: student[4]
        }

        let feedetail = {
          regNo: student[1]
        }

        jsonStudentAcademicData.push(studentacademic);
        jsonStudentData.push(studentjson);
        jsonStudentFeeDetail.push(feedetail);
      });
    }
  //  console.log(jsonStudentData);
  //  console.log(jsonStudentAcademicData);
  //  console.log(jsonStudentFeeDetail);
    this.setState({
      jsonStudentData: jsonStudentData,
      jsonStudentAcademicData: jsonStudentAcademicData,
      jsonStudentFeeDetail: jsonStudentFeeDetail,
      datatable_rows: jsonStudentData
    }, ()=>{
      this.setState({
        datatable: {
          columns: this.state.datatable_columns,
          rows: this.state.datatable_rows
        }
      }, ()=>{
        console.log(this.state.datatable);
      });
    });

    //console.log(this.state.jsonStudentData);
  }


  render() {

    //console.log(this.state.rows);
    //console.log(this.state.cols);
    return (
      <div className="UploadStudentFile-main-frame">
        <div className="upload-file-header-frame">
          <label>Upload the student data in Excel Format: </label> &nbsp;&nbsp;
          <input  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={this.fileHandler}/>
          <input type="submit" onClick={this.handleClick}/>
        </div>
        {
          this.generateTable()
        }
      </div>

    );
  }
}
