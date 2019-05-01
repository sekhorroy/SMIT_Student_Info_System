import React from 'react';
import { Button } from 'react-bootstrap';

export class AdminFacultyRemove extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      empId: ''
    }
    this.onChangeempId = this.onChangeempId.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onChangeempId(e) {
    this.setState({
      empId: e.target.value
    });
  }

  onDelete() {
    if(!this.state.empId) {
      window.alert('Please Enter the empId')
    } else {
      fetch('/api/adminaccount/removefaculty', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          empId: this.state.empId
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
      <div className="AdminFacultyRemove-main-frame">
        <div className="AdminFacultyRemove-body-frame">
          <label>Employee_Id:</label>
          <input type="text" className="browser-default custom-select" onChange={this.onChangeempId} required/>
          <div>
            <Button onClick={this.onDelete}>Click To Delete</Button>
          </div>
        </div>
      </div>
    );
  }
}
