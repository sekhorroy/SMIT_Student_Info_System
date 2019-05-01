import React from 'react';
import './FeeDepartmentUpdateFee.css';
import { Button, Table } from 'react-bootstrap';

export class FeeDepartmentUpdateManyFee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      option: '',
      amount: '',
      operator: '',
      semester: '',
      branch: ''
    }

    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
    this.generateFeeDetailTable = this.generateFeeDetailTable.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangePlus = this.onChangePlus.bind(this);
    this.onChangeMinus = this.onChangeMinus.bind(this);
    this.onUpdateFee = this.onUpdateFee.bind(this);
  }

  onChangeSemester(e) {
    this.setState({
      semester: e.target.value
    });
  }

  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    });
  }

  onChangeOption(e) {
    this.setState({
      option: e.target.value
    }, ()=>{
      console.log(this.state.option);
    });
  }

  onChangePlus() {
    if(!this.state.amount) {
      window.fetch('Enter Amount');
    } else {
      let newfeeDetail = this.state.feeDetail;
      newfeeDetail.forEach((student)=>{
        student.feestructure.semester_fee[this.state.option] += Number(this.state.amount);
      });
      this.setState({
        feeDetail: newfeeDetail
      });
    }
  }

  onChangeMinus() {
    if(!this.state.amount) {
      window.fetch('Enter Amount');
    } else {
      let newfeeDetail = this.state.feeDetail;
      newfeeDetail.forEach((student)=>{
        student.feestructure.semester_fee[this.state.option] -= Number(this.state.amount);
      });
      this.setState({
        feeDetail: newfeeDetail
      });
    }
  }

  onUpdateFee() {
    if(!this.state.feeDetail) {
      window.fetch('Failed')
    } else {
      fetch('/api/feedepartment/updatemanydetail', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          feeDetailArray: this.state.feeDetail
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          window.alert('Update Successfull');
        } else {
          window.alert('Update Failed');
        }
      });
    }
  }

  onSearch() {
    if(!this.state.semester && !this.state.branch && !this.state.option) {
      window.fetch('Please Select Semester And Branch');
    } else {
      //console.log(here);
      fetch('/api/feedepartment/getmanyfeedetail', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          branch: this.state.branch,
          semester: this.state.semester
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          this.setState({
            feeDetail: json.data
          }, ()=>{
            console.log(this.state.feeDetail);
          });
        } else {
          window.alert('Fetching Failed Fee Detail');
        }
      });
    }
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  generateFeeDetailTable() {
    if(this.state.feeDetail) {
      let row = this.state.feeDetail.map((student, index)=>{
        return (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.regNo}</td>
            <td>{student.feestructure.semester_fee[this.state.option]}</td>
          </tr>
        );
      });
      return (
        <div>
          <Table size="sm">
            <thead>
              <tr>
                <th colSpan="3">FeeDetail</th>
              </tr>
              <tr>
                <th>Name</th>
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
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="FeeDepartmentUpdateMany-main-frame">
        <div className="FeeDepartmentUpdateMany-header-frame">
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
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="EEE">EEE</option>
            <option value="CE">CE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
          </select>
          <select  className="browser-default custom-select" onChange={this.onChangeOption}>
            <option value="">Select Option</option>
            <option value="messdeposit">MessDeposit</option>
            <option value="libraryfine">LibraryFine</option>
            <option value="examfee">ExamFee</option>
            <option value="otherfee">OtherFee</option>
          </select>
          <Button onClick={this.onSearch}><i className="fas fa-search"></i> Search</Button>
        </div>
        <div className="FeeDepartmentUpdateMany-body-frame">
          <div className="FeeDepartmentUpdateMany-body-top-frame">
            <input type="text" className="browser-default custom-select" placeholder="Enter Amount" onChange={this.onChangeAmount}/>
            <Button onClick={this.onChangePlus}> <i className="fas fa-plus"></i> </Button>
            <Button onClick={this.onChangeMinus}> <i className="fas fa-minus"></i> </Button>
          </div>
          <div className="FeeDepartmentUpdateMany-body-bottom-frame">
            {
              this.generateFeeDetailTable()
            }
          </div>
          <div className="update-btn">
            <Button onClick={this.onUpdateFee}>Update Fee</Button>
          </div>
        </div>
      </div>
    );
  }
}
