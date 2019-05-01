import React , { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import './UpdatePassword.css';
import { getFromStorage } from '../../Util/LocalStorage';

export class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmpassword: ''
    }
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }


  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value
    });
  }

  onUpdate() {
    const empId = getFromStorage('faculty_obj').empId;
    console.log(empId);
    if(this.state.password === this.state.confirmpassword && this.state.password) {
      fetch('/api/facultyaccount/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          empId: empId,
          password: this.state.password
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
      window.alert('Please Enter the password carefully');
    }
  }

  render() {
    return (
      <div className="FacultyUpdatePassword-main-frame">
        <div className="FacultyUpdatePassword-frame">
          <label>Enter new Password &nbsp;</label>
          <Input className="FacultyUpdatePassword-Input" type="password" onChange={this.onChangePassword}/>
          <br/>
          <br/>
          <label>Confirm Password &nbsp;&nbsp;&nbsp;&nbsp;</label>
          <Input className="FacultyUpdatePassword-Input" type="password" onChange={this.onChangeConfirmPassword}/>
          <br/>
          <br/>
          <div className="FacultyUpdatePassword-btn">
            <Button primary onClick={this.onUpdate}>Update Password</Button>
          </div>
        </div>
      </div>
    );
  }
}
