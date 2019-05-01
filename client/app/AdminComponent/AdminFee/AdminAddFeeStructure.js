import React from 'react';
import { Button } from  'react-bootstrap';

export class AdminAddFeeStruture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: '',
      branch: '',
      noofsemester: ''
    }

    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onChangeNoofSemester = this.onChangeNoofSemester.bind(this);
    this.onSubmitAdd = this.onSubmitAdd.bind(this);
    this.onSubmitRemove = this.onSubmitRemove.bind(this);
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

  onChangeNoofSemester(e) {
    this.setState({
      noofsemester: e.target.value
    });
  }

  onSubmitAdd() {
    if(!this.state.course || !this.state.branch || !this.state.noofsemester) {
      window.alert('Please Select Course And Branch');
    } else {
      fetch('/api/adminaccount/addnewfeestructure', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          branch: this.state.branch,
          course: this.state.course,
          noofsemester: this.state.noofsemester
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
  }

  onSubmitRemove() {
    if(!this.state.course || !this.state.branch) {
      window.alert('Please enter Select Valid course and branch');
    } else {
      
    }
  }

  render() {
    return (
      <div className="AdminAddFeeStruture-main-frame">
        <div className="AdminAddFeeStruture-body-frame">
          <div className="leftframe">
            <div className="add-frame-header">
              <h3>Add Fee Structure</h3>
            </div>
            <div className="add-frame-body">
              <label>Select Course</label>
              <select  className="browser-default custom-select" onChange={this.onChangeCourse}>
                <option value="">Select Course</option>
                <option value="Btech">Btech</option>
              </select>
              <label>Select Branch</label>
              <select  className="browser-default custom-select" onChange={this.onChangeBranch}>
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="MECH">MECH</option>
                <option value="EEE">EEE</option>
                <option value="CE">CE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
              </select>
              <label>No.of semester in a branch</label>
              <select  className="browser-default custom-select" onChange={this.onChangeNoofSemester}>
                <option value="">Select no of Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              <div className="AdminAddFeeStructure-btn">
                <Button onClick={this.onSubmitAdd}>Add</Button>
              </div>
            </div>
          </div>
          <div className="rightframe">
            <div className="remove-frame-header">
              <h3>Remove Fee Structure</h3>
            </div>
            <div className="remove-frame-body">
            <label>Select Course</label>
            <select  className="browser-default custom-select" onChange={this.onChangeCourse}>
              <option value="">Select Course</option>
              <option value="Btech">Btech</option>
            </select>
            <label>Select Branch</label>
            <select  className="browser-default custom-select" onChange={this.onChangeBranch}>
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
              <option value="EEE">EEE</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
            <div className="AdminAddFeeStructure-btn">
              <Button onClick={this.onSubmit}>Remove</Button>
            </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
