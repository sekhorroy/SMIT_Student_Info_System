import React from 'react';
import './FeeDepartmentCheckFee.css';
import { Button, Table } from 'react-bootstrap';
import Loader from 'react-loader-spinner'

export class FeeDepartmentCheckFee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      regNo: ''
    }

    this.onChangeRegNo = this.onChangeRegNo.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.generateStudentDetail = this.generateStudentDetail.bind(this);
    this.generateStudentFeeDetail = this.generateStudentFeeDetail.bind(this);
  }

  onChangeRegNo(e) {
    this.setState({
      regNo: e.target.value
    });
  }

  onSearch() {
    if(!this.state.regNo) {
      window.alert('Please Enter the RegNo in provided fields');
    } else {
      fetch('/api/feedepartment/getstudentfeedetails', {
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
            studentdetail: json.studentdetail,
            studentfeedetail: json.studentfeedetail,
            feestructure: json.feestructure
          }, ()=>{
            console.log(this.state.studentdetail);
            console.log(this.state.studentfeedetail);
            console.log(this.state.feestructure);
          });
        } else {

        }
      });
    }
  }

  generateStudentDetail() {
    if(this.state.studentdetail) {
      return(
        <Table>
          <thead>
            <tr>
              <th colSpan="2">Student Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span>Name </span></td>
              <td>{this.state.studentdetail.name}</td>
            </tr>
            <tr>
              <td><span>RegNo </span></td>
              <td>{this.state.studentdetail.regNo}</td>
            </tr>
            <tr>
              <td><span>Course </span></td>
              <td>{this.state.studentdetail.course}</td>
            </tr>
            <tr>
              <td><span>Branch </span></td>
              <td>{this.state.studentdetail.branch}</td>
            </tr>
            <tr>
              <td><span>Semester </span></td>
              <td>{this.state.studentdetail.currentsem}</td>
            </tr>
          </tbody>
        </Table>
    );
    } else {
      return null;
    }
  }

  generateStudentFeeDetail() {
    if(this.state.studentfeedetail && this.state.feestructure) {
      let row = this.state.feestructure.semester_fee.map((semesterfee, index)=>{

        let studentsemesterfee = this.state.studentfeedetail.semester_fee.filter((semester)=>{return semester.semester === semesterfee.semester});

        return (
          <tr key={index}>
            <td>{semesterfee.semester}</td>
            <td>{semesterfee.coursefee}</td>
            <td>{semesterfee.messfee}</td>
            <td>{semesterfee.hostelfee}</td>
            <td>{semesterfee.miscellaneous}</td>
            <td>{studentsemesterfee[0].messdeposit}</td>
            <td>{studentsemesterfee[0].libraryfine}</td>
            <td>{studentsemesterfee[0].examfee}</td>
            <td>{studentsemesterfee[0].otherfee}</td>
          </tr>
        );
      });

      return (
        <Table bordered size="sm">
          <thead>
            <tr>
              <th colSpan="9">FeeDetail</th>
            </tr>
            <tr>
              <th>Semester</th>
              <th>CourseFee</th>
              <th>MessFee</th>
              <th>HostelFee</th>
              <th>Misc-Fee</th>
              <th>MessDeposit</th>
              <th>LibraryFine</th>
              <th>ExamFee</th>
              <th>OtherFee</th>
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
      <div className="FeeDepartmentCheckFee-main-frame">
        <div className="FeeDepartmentCheckFee-header-frame">
          <input type="text" value={this.state.regNo} placeholder="Enter RegNo to Search" onChange={this.onChangeRegNo}/>
          <Button variant="outline-info" onClick={this.onSearch}><i className="fas fa-search"></i> Search</Button>
        </div>
        <div className="FeeDepartmentCheckFee-body-frame">
          <div className="FeeDepartmentCheckFee-studentdetail-frame">
            {
              this.generateStudentDetail()
            }
          </div>
          <div className="FeeDepartmentCheckFee-feedetail-frame">
            {
              this.generateStudentFeeDetail()
            }
          </div>
        </div>
      </div>
    );
  }
}
