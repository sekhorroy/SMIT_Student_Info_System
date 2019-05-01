import React from 'react';
import { Button } from 'react-bootstrap';

export class AddFaculty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: '',
      password: '',
      branch: ''
    }
    this.onChangeempId = this.onChangeempId.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangeBranch = this.onChangeBranch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeempId(e) {
    this.setState({
      empId: e.target.value
    });
  }

  onChangepassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeBranch(e) {
    this.setState({
      branch: e.target.value
    });
  }

  onSubmit() {
    const { empId, password, branch } = this.state;
    if(!this.state.empId && !this.state.password && !this.state.branch) {
      window.alert('Please enter the empId, password and branch');
    } else {
      fetch('/api/adminaccount/insertnewfaculty', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          empId: empId,
          password: password,
          branch: branch
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

  render() {
    return (
      <div className="Admin-AddFaculty-main-frame">
        <div className="Admin-AddFaculty-header-frame">
          <h3>ADD FACULTY</h3>
        </div>
        <div className="Admin-AddFaculty-body-frame">
          <label>Employee_Id:</label>
          <input type="text" className="browser-default custom-select" onChange={this.onChangeempId} required/>
          <label>Password:</label>
          <input type="text" className="browser-default custom-select" onChange={this.onChangepassword} required/>
          <label>Select Branch</label>
          <select className="browser-default custom-select" onChange={this.onChangeBranch}>
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="EEE">EEE</option>
            <option value="CE">CE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
          </select>
          <div className="Admin-AddFaculty-body-frame-btn">
            <Button variant="success" onClick={this.onSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}
