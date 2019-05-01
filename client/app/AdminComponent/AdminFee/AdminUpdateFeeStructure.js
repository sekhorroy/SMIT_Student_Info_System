import React from 'react';
import { Button, Table } from 'react-bootstrap';

export class AdminUpdateFeeStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: '',
      branch: '',
    }

    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.generateFeeDetailTable = this.generateFeeDetailTable.bind(this);
    this.handleFeeDataTable = this.handleFeeDataTable.bind(this);
    this.onSubmitMarks = this.onSubmitMarks.bind(this);
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value
    });
  }

  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    });
  }

  handleFeeDataTable(e) {
    var item = {
      id: e.target.id,
      name: e.target.name,
      value: Number(e.target.value)
    }

    //console.log(item);

    let feeDetail = this.state.feedetail;

    let newfeeDetail = {
      branch: feeDetail.branch,
      course: feeDetail.course,
      _id: feeDetail._id,
      semester_fee: []
    }

    feeDetail.semester_fee.map((semester)=>{
      if(semester._id === item.id) {
        semester[item.name] = item.value;
      }
      newfeeDetail.semester_fee.push(semester);
    });

    this.setState({
      feedetail: newfeeDetail
    });
    //console.log(this.state.feedetail);
    /*
    var feeDetail = this.state.feedetail;

    var newfeeDetail = [];

    feeDetail.semester_fee.map((semester)=>{
      if(semester.id === item.id){
        semester[name] = item.value;
      }
      newfeeDetail.push(semester);
    });

    this.setState({
      feedetail: newfeeDetail
    });

    console.log(this.state.feedetail);
    */
  }


  generateFeeDetailTable() {
    if(this.state.feedetail) {
      let row = this.state.feedetail.semester_fee.map((semester, index)=>{
        let keyname = Object.keys(semester);
        return (
          <tr key={index}>
            <td>{semester.semester}</td>
            <td><input type="text" name={keyname[1]} id={semester._id} defaultValue={semester.coursefee} onChange={this.handleFeeDataTable}/></td>
            <td><input type="text" name={keyname[2]} id={semester._id} defaultValue={semester.hostelfee} onChange={this.handleFeeDataTable}/></td>
            <td><input type="text" name={keyname[3]} id={semester._id} defaultValue={semester.messfee} onChange={this.handleFeeDataTable}/></td>
            <td><input type="text" name={keyname[4]} id={semester._id} defaultValue={semester.miscellaneous} onChange={this.handleFeeDataTable}/></td>
          </tr>
        );
      });
      return (
        <Table bordered>
          <thead>
            <tr>
              <th>Semester</th>
              <th>CourseFee</th>
              <th>HostelFee</th>
              <th>MessFee</th>
              <th>MiscellaneousFee</th>
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

  onSearch() {
    if(!this.state.course || !this.state.branch) {
      window.alert('Please Select Course And Branch');
    } else {
      fetch('/api/adminaccount/searchfeedetail', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          course: this.state.course,
          branch: this.state.branch
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          this.setState({
            feedetail: json.data
          }, ()=>{
            console.log(this.state.feedetail);
          });
        } else {
          window.alert(json.message)
        }
       });
    }
  }

  onSubmitMarks() {
    if(this.state.feedetail) {
      fetch('/api/adminaccount/updatefeestructure', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          feedetail: this.state.feedetail
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          window.alert(json.message);
        } else {
          window.alert(json.message);
        }
      })
    }
  }

  render() {
    return (
      <div className="AdminUpdateFeeStructure-main-frame">
        <div className="AdminUpdateFeeStructure-header-frame">
          <select  className="browser-default custom-select" onChange={this.onChangeCourse}>
            <option value="">Select Course</option>
            <option value="Btech">Btech</option>
          </select>
          <select  className="browser-default custom-select" onChange={this.onChangeBranch}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="EEE">EEE</option>
            <option value="CE">CE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>
          <Button onClick={this.onSearch}>Search</Button>
        </div>
        <div className="AdminUpdateFeeStructure-body-frame">
          {
            this.generateFeeDetailTable()
          }
        </div>
        <div className="AdminUpdateFeeStructure-main-frame-btn">
          <Button onClick={this.onSubmitMarks}>UPDATE FEE STRUCTURE</Button>
        </div>
      </div>
    );
  }
}
