import React from 'react';
import { Button } from 'react-bootstrap';

export class AdminUpdateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regNo: ''
    }

    this.handleRegNoChange = this.handleRegNoChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  handleRegNoChange(e){
    this.setState({
      regNo: e.target.value
    });
  }

  onSearch() {
    if(!this.state.regNo) {
      window.alert('Please enter the most required registration number');
    } else {

    }
  }

  render() {
    return (
      <div className="AdminUpdateStudent-main-frame">
        <div className="AdminUpdateStudent-header-frame">
          <input type="text" value={this.state.regNo} placeholder="Enter RegNo to Search" onChange={this.handleRegNoChange}/>
          <Button variant="outline-info" onClick={this.onSearch}>Search</Button>
        </div>
      </div>
    );
  }
}
