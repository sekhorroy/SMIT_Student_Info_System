import React from 'react';
import { Button, Table } from 'react-bootstrap';

export class FeeDepartmentUpdateFeeOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      regNo: ''
    }

    this.onChangeRegNo = this.onChangeRegNo.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onGenerateTable = this.onGenerateTable.bind(this);
    this.handleFeeDataTable = this.handleFeeDataTable.bind(this);
    this.onUpdateMarks = this.onUpdateMarks.bind(this);
  }

  onChangeRegNo(e) {
    this.setState({
      regNo: e.target.value
    });
  }

  onSearch() {
    if(!this.state.regNo) {
      window.alert('Enter RegNo');
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
            studentfeedetail: json.studentfeedetail,
          }, ()=>{
            console.log(this.state.studentfeedetail);
          });
        } else {
          window.alert('Fetch Student Fee Detail failed')
        }
      });
    }
  }

  handleFeeDataTable(e) {
    var item = {
      id: e.target.id,
      name: e.target.name,
      value: Number(e.target.value)
    }

    let feeDetail = this.state.studentfeedetail;

    feeDetail.semester_fee.forEach((semester)=>{
      if(semester._id === item.id) {
        semester[item.name] = item.value
      }
    });

    this.setState({
      studentfeedetail: feeDetail
    }, ()=>{
      console.log(this.state.studentfeedetail);
    });
  }

  onUpdateMarks() {
    if(this.state.studentfeedetail) {
      fetch('/api/feedepartment/updateStudentFee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          feedetail: this.state.studentfeedetail
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
    } else {
      window.alert('Please Search First And Update To proceed')
    }
  }


  onGenerateTable() {
    if(this.state.studentfeedetail) {
      let row = this.state.studentfeedetail.semester_fee.map((semesterfee, index)=>{
        let keyname = Object.keys(semesterfee);
        return (
          <tr key={index}>
            <td>{semesterfee.semester}</td>
            <td><input type="text" name={keyname[1]} id={semesterfee._id} defaultValue={semesterfee.messdeposit} onChange={this.handleFeeDataTable}/></td>
            <td><input type="text" name={keyname[2]} id={semesterfee._id} defaultValue={semesterfee.libraryfine} onChange={this.handleFeeDataTable}/></td>
            <td><input type="text" name={keyname[3]} id={semesterfee._id} defaultValue={semesterfee.examfee} onChange={this.handleFeeDataTable}/></td>
            <td><input type="text" name={keyname[4]} id={semesterfee._id} defaultValue={semesterfee.otherfee} onChange={this.handleFeeDataTable}/></td>
          </tr>
        );
      });
      return (
        <div>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th colSpan="5">REGNO: {this.state.studentfeedetail.regNo}</th>
              </tr>
              <tr>
                <th>Semester</th>
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
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="FeeDepartmentUpdateFeeOne-main-frame">
        <div className="FeeDepartmentUpdateFeeOne-header-frame">
            <input type="text" className="browser-default custom-select" placeholder="Enter RegNo" onChange={this.onChangeRegNo}/>
            <Button variant="outline-info" onClick={this.onSearch}>Search</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={this.onUpdateMarks}>Update Marks</Button>
        </div>
        <div className="FeeDepartmentUpdateFeeOne-body-frame">
          {
            this.onGenerateTable()
          }
        </div>

      </div>
    );
  }
}
