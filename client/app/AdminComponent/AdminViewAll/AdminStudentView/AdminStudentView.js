import React from 'react';
import { Table } from 'react-bootstrap';

export class AdminStudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: [],
      data2: []
    }

    this.generateEvenStudent = this.generateEvenStudent.bind(this);
  }

  componentDidMount() {
    const year = this.props.year;

    let currentsem1 = 1;
    let currentsem2 = 2;


    if(year === "1") {
      console.log('1');
      currentsem1 = 1;
      currentsem2 = 2;
    }

    if(year === "2") {
      console.log('2');
      currentsem1 = 3;
      currentsem2 = 4;
    }

    if(year === "3") {
      console.log('3');
      currentsem1 = 5;
      currentsem2 = 6;
    }

    if(year === "4") {
      console.log('4');
      currentsem1 = 7;
      currentsem2 = 8;
    }



      fetch('/api/adminaccount/getstudentdetails', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          currentsem: currentsem1
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          this.setState({
            data1: json.data
          });
        } else {
          console.log('fetch data1 failed');
        }
      });

        fetch('/api/adminaccount/getstudentdetails', {
           method: 'POST',
           headers: {
             'Content-Type':'application/json'
           },
           body: JSON.stringify({
             currentsem: currentsem2
           })
         })
         .then(res=>res.json())
         .then(json=>{
           if(json.success) {
             this.setState({
               data2: json.data
             });
           } else {
             console.log('fetch data2 failed');
           }
         });

         //console.log(this.state.data1);
         //console.log(this.state.data2);
  }

  generateEvenStudent() {
    if(this.state.data2) {
      let row = this.state.data2.map((student, index)=>{
        return (
          <tr key={index}>
            <td>{student.name}</td>
            <td>{student.regNo}</td>
            <td>{student.course}</td>
            <td>{student.branch}</td>
            <td>{student.currentsem}</td>
          </tr>
        );
      });

      return(
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>RegNo</th>
              <th>Course</th>
              <th>Branch</th>
              <th>Semester</th>
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
    //console.log(this.state.data1);
    //console.log(this.state.data2);
    return (
      <div className="generate-subject-main-frame">
        {
          this.generateEvenStudent()
        }
      </div>
    );
  }
}
