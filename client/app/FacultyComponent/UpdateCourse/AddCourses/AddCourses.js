import React, { Component } from 'react';
import './AddCourses.css';
import { getFromStorage } from '../../../Util/LocalStorage';
import { Alert } from 'react-bootstrap';
import { Table, Button, Modal } from 'react-bootstrap';
//import ReactToPrint from 'react-to-print';

export class AddCourses extends Component {
  constructor(props){
    super(props);
    this.state = {
      branch: '',
      semester: '',
      coursename: '',
      coursecode: '',
      error: ''
    };
    this.onTextBoxChangeCourseName = this.onTextBoxChangeCourseName.bind(this);
    this.onTextBoxChangeCourseCode = this.onTextBoxChangeCourseCode.bind(this);
    this.onAddCourse = this.onAddCourse.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.checkError = this.checkError.bind(this);
  }

  onTextBoxChangeCourseName(e) {
    this.setState({
      coursename: e.target.value
    });
  }
  onTextBoxChangeCourseCode(e) {
    this.setState({
      coursecode: e.target.value
    });
  }

  handleSelectChange(e) {
    this.setState({
      semester: e.target.value
    });
  }

  componentWillMount() {
    const { branch } = getFromStorage('faculty_obj');
    this.setState({
      branch: branch
    });
  }

  onAddCourse(e) {
     e.preventDefault();

     const {
       branch,
       semester,
       coursename,
       coursecode,
     } = this.state;

     fetch('/api/facultyaccount/addcourses', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         branch: branch,
         semester: semester,
         coursename: coursename,
         coursecode: coursecode
       }),
     })
     .then(res=>res.json())
     .then(json=>{
       if(json.success) {
         this.setState({
           error: json.message
         });

       } else {
         this.setState({
           error: json.message
        });
       }
     });

     this.setState({
       semester: '',
       coursename: '',
       coursecode: '',
     });

  }

  checkError() {
    if(!this.state.error)
      return null;
    else{
      if(this.state.error === "successfully subject add"){
        return(
          <Alert variant="success">
            Subject added successfully
          </Alert>
        );
      } else {
        return(
        <Alert variant="danger">
          Subject Could not be added
        </Alert>
      );
      }
    }
  }

  render() {
    const { coursename, coursecode, error } = this.state;
    return(
      <div className="compulsory-courses-main-frame">
        <form>
          <div className="coursename-form">
            <label htmlFor="coursename">Course Name</label><br />
            <input type="text"
                   className="coursename-input"
                   placeholder="Course Name"
                   value={coursename}
                   onChange={this.onTextBoxChangeCourseName}
                   required/><br />
          </div>
          <br/>
          <div className="coursecode-form">
            <label htmlFor="coursecode">Course Code</label><br />
            <input type="text"
                   className="coursecode-input"
                   placeholder="Course Code"
                   value={coursecode}
                   onChange={this.onTextBoxChangeCourseCode}
                   required/><br />
          </div>
          <br/>
          <div className="select-menu-frame">
          <select name="Semester" onClick={this.handleSelectChange}>
              <option value="selectSemester">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
          </select>
          </div>
          <br/>
          <input type="submit" className="addcourse-btn" value="Add Course" onClick={(e)=>{this.onAddCourse(e)}}/><br />
          <br/>
          <br/>
            {
              this.checkError()
            }
          <br/>
        </form>
      </div>
    );
  }
}

export class AddElectiveCourses extends Component {
  constructor(props){
    super(props);
    this.state = {
      branch: '',
      semester: '',
      coursename: '',
      coursecode: '',
      seatsavailable: '',
      error: ''
    };
    this.onTextBoxChangeCourseName = this.onTextBoxChangeCourseName.bind(this);
    this.onTextBoxChangeCourseCode = this.onTextBoxChangeCourseCode.bind(this);
    this.onTextBoxChangeSeatsAvailable = this.onTextBoxChangeSeatsAvailable.bind(this);
    this.onAddElectiveCourse = this.onAddElectiveCourse.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.checkError = this.checkError.bind(this);
  }

  componentWillMount() {
    const { branch } = getFromStorage('faculty_obj');
    this.setState({
      branch: branch
    });
  }

  onTextBoxChangeCourseName(e) {
    this.setState({
      coursename: e.target.value
    });
  }
  onTextBoxChangeCourseCode(e) {
    this.setState({
      coursecode: e.target.value
    });
  }


  handleSelectChange(e) {
      this.setState({
        semester: e.target.value
      });
  }

  onTextBoxChangeSeatsAvailable(e) {
    this.setState({
      seatsavailable: e.target.value
    });
  }

  checkError() {
    if(!this.state.error)
      return null;
    else{
      if(this.state.error === "successfully subject add"){
        return(
          <Alert variant="success">
            Subject added successfully
          </Alert>
        );
      } else {
        return(
        <Alert variant="danger">
          Subject Could not be added
        </Alert>
      );
      }
    }
  }

  onAddElectiveCourse(e) {
    e.preventDefault();
    const {
      branch,
      semester,
      coursename,
      coursecode,
      seatsavailable,
      error
    } = this.state;

    fetch('/api/facultyaccount/addelectivecourses', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        branch: branch,
        semester: semester,
        coursename: coursename,
        coursecode: coursecode,
        seatsavailable: seatsavailable
      }),
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        this.setState({
          error: json.message
        });
      } else {
        this.setState({
          error: json.message
        });
      }
    });
    this.setState({
      semester: '',
      coursename: '',
      coursecode: '',
      seatsavailable: ''
    });
  }

  render() {
    const { coursename, coursecode, seatsavailable, error } = this.state;
    //console.log(this.state.error);
    return(
      <div className="compulsory-courses-main-frame">
        <form>
          <div className="coursename-form">
            <label htmlFor="coursename">Course Name</label><br />
            <input type="text"
                   className="coursename-input"
                   placeholder="Course Name"
                   value={coursename}
                   onChange={this.onTextBoxChangeCourseName}/><br />
          </div>
          <br/>
          <div className="coursecode-form">
            <label htmlFor="coursecode">Course Code</label><br />
            <input type="text"
                   className="coursecode-input"
                   placeholder="Course Code"
                   value={coursecode}
                   onChange={this.onTextBoxChangeCourseCode}/><br />
          </div>
          <br/>
          <div className="select-menu-frame">
          <select name="Semester" onClick={this.handleSelectChange}>
              <option value="selectSemester">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
          </select>
          </div>
          <br/>
          <div className="seatsavailable-form">
            <label htmlFor="seatsavailable">Seats Available</label><br />
            <input type="text"
                   className="seatsavailable-input"
                   placeholder="seatsavailable ( in Number )"
                   value={seatsavailable}
                   onChange={this.onTextBoxChangeSeatsAvailable}/><br />
          </div>
          <input type="submit" className="addcourse-btn" value="Add Elective Course" onClick={(e)=>{this.onAddElectiveCourse(e)}}/><br />
          <br/>
          <br/>
          {
            this.checkError()
          }
        </form>
      </div>
    );
  }
}

export class AddLabCourses extends Component {
  constructor(props){
    super(props);
    this.state = {
      branch: '',
      semester: '',
      coursename: '',
      coursecode: '',
      error: ''
    };
    this.onTextBoxChangeCourseName = this.onTextBoxChangeCourseName.bind(this);
    this.onTextBoxChangeCourseCode = this.onTextBoxChangeCourseCode.bind(this);
    this.onAddCourse = this.onAddCourse.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.checkError = this.checkError.bind(this);
  }

  onTextBoxChangeCourseName(e) {
    this.setState({
      coursename: e.target.value
    });
  }
  onTextBoxChangeCourseCode(e) {
    this.setState({
      coursecode: e.target.value
    });
  }

  handleSelectChange(e) {
    this.setState({
      semester: e.target.value
    });
  }

  componentWillMount() {
    const { branch } = getFromStorage('faculty_obj');
    this.setState({
      branch: branch
    });
  }

  onAddCourse(e) {
     e.preventDefault();

     const {
       branch,
       semester,
       coursename,
       coursecode,
     } = this.state;

     fetch('/api/facultyaccount/addlabs', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         branch: branch,
         semester: semester,
         coursename: coursename,
         coursecode: coursecode
       }),
     })
     .then(res=>res.json())
     .then(json=>{
       if(json.success) {
         this.setState({
           error: json
         });

       } else {
         this.setState({
           error: json
        });
       }
     });

     this.setState({
       semester: '',
       coursename: '',
       coursecode: '',
     });

  }

  checkError() {
    if(!this.state.error)
      return null;
    else{
      if(this.state.error.success){
        return(
          <Alert variant="success">
            Lab added successfully
          </Alert>
        );
      } else {
        return(
        <Alert variant="danger">
          Lab Could not be added
        </Alert>
      );
      }
    }
  }

  render() {
    const { coursename, coursecode, error } = this.state;
    return(
      <div className="compulsory-courses-main-frame">
        <form>
          <div className="coursename-form">
            <label htmlFor="coursename">Course Name</label><br />
            <input type="text"
                   className="coursename-input"
                   placeholder="Course Name"
                   value={coursename}
                   onChange={this.onTextBoxChangeCourseName}
                   required/><br />
          </div>
          <br/>
          <div className="coursecode-form">
            <label htmlFor="coursecode">Course Code</label><br />
            <input type="text"
                   className="coursecode-input"
                   placeholder="Course Code"
                   value={coursecode}
                   onChange={this.onTextBoxChangeCourseCode}
                   required/><br />
          </div>
          <br/>
          <div className="select-menu-frame">
          <select name="Semester" onClick={this.handleSelectChange}>
              <option value="selectSemester">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
          </select>
          </div>
          <br/>
          <input type="submit" className="addcourse-btn" value="Add Course" onClick={(e)=>{this.onAddCourse(e)}}/><br />
          <br/>
          <br/>
            {
              this.checkError()
            }
          <br/>
        </form>
      </div>
    );
  }
}

/*
class StudentAllotmentModal extends React.Component {
  render() {
      if(this.props.student) {
       let row = this.props.student.map((student, index)=>{
       let rowspanvalue = student.subject.length;
       let lablength = student.lab.length-1;
       let regularrow = student.subject.map((subject, index)=>{
         if(index === 0){
           return;
         }
         if(lablength === 0){
           return (
             <tr key={index}>
               <td>{subject.subjectname}-{subject.subjectcode}</td>
             </tr>
           );
         }
         lablength --;
         return (
           <tr key={index}>
             <td>{subject.subjectname}-{subject.subjectcode}</td>
             <td>{student.lab[index].labname} - {student.lab[index].labcode}</td>
           </tr>
         );
       });
       return (
         <>
         <tr key={index}>
           <td rowSpan={rowspanvalue.toString()}>{student.regNo}</td>
           <td rowSpan={rowspanvalue.toString()}>{student.currentsem}</td>
           <td rowSpan={rowspanvalue.toString()}>{student.branch}</td>
           <td rowSpan={rowspanvalue.toString()}>{student.sec}</td>
           <td>{student.subject[0].subjectname}-{student.subject[0].subjectcode}</td>
           <td>{student.lab[0].labname}-{student.lab[0].labcode}</td>
         </tr>
         {
           regularrow
         }
         </>
       );
    });

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Elective Allotment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBTable bordered small scrollY id="print-table-student">
         <MDBTableHead color="black">
           <tr>
             <th>RegNo</th>
             <th>Semester</th>
             <th>Branch</th>
             <th>Section</th>
             <th>Subjects</th>
             <th>Labs</th>
           </tr>
         </MDBTableHead>
         <MDBTableBody>
            {
              row
            }
         </MDBTableBody>
        </MDBTable>
        </Modal.Body>
        <Modal.Footer>


          <Button onClick={()=>{
             let divToPrint=document.getElementById("print-table-student");
             let newWin = window.open("");
             var htmlToPrint = '' +
               '<style type="text/css">' +
               'table th, table td {' +
               'border:0.4px solid;' +
               '}' +
               '</style>';
             htmlToPrint += divToPrint.outerHTML;
             newWin.document.write(htmlToPrint);
             newWin.print();
             newWin.close();
          }}>Print</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
    else {
      return null;
    }
  }
}
*/

class StudentAllotmentModal extends React.Component {
  render() {
    if(this.props.student) {
          const faculty_obj = getFromStorage('faculty_obj');
          const { branch } = faculty_obj;
          //console.log(this.props.student);

          let row = this.props.student.map((student, index)=>{

            let regularrow = student.subject.map((subject, index)=>{
              return (
                <td>{subject.subjectcode}</td>
              );
            });

            return (
              <tr>
                <td>{student.regNo}</td>
                <td>{student.cgpa}</td>
                {
                  regularrow
                }
              </tr>
            );
          });

          return (
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Elective Allotment
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
               <Table bordered id="print-table-student">
                <thead>
                  <tr>
                    <th colSpan="9">Auto Allotment Elective Branch: {branch} Semester: {this.props.semester}</th>
                  </tr>
                  <tr>
                    <th>REGNO</th>
                    <th>CGPA</th>
                    <th colSpan="6">ELECTIVESUBJECT</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    row
                  }
                </tbody>
               </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={()=>{
                   let divToPrint=document.getElementById("print-table-student");
                   let newWin = window.open("");
                   var htmlToPrint = '' +
                     '<style type="text/css">' +
                     'table th, table td {' +
                     'border:1px solid;' +
                     '}' +
                     '</style>';
                   htmlToPrint += divToPrint.outerHTML;
                   newWin.document.write(htmlToPrint);
                   newWin.print();
                   newWin.close();
                }}>Print</Button>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
    } else {
      return null;
    }
  }
}


class ElectiveListGenerateModal extends React.Component {
  render() {
          let row = this.props.student.map((student, index)=>{
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.regNo}</td>
              </tr>
            );
          });
          return (
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Elective Allotment
                </Modal.Title>
              </Modal.Header>
              <Modal.Body id="print-table-student-list">
                <div className="modal-elective-student-generate-list">
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th colSpan="2">SubjectCode: {this.props.subjectcode}  &nbsp; Semester: {this.props.semester}</th>
                      </tr>
                      <tr>
                        <th>SL.NO</th>
                        <th>REGISTRATION NUMBER</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        row
                      }
                    </tbody>
                  </Table>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={()=>{
                   let divToPrint=document.getElementById("print-table-student-list");
                   let newWin = window.open("");
                   var htmlToPrint = '' +
                     '<style type="text/css">' +
                     'table th, table td {' +
                     'border:1px solid;' +
                     '}' +
                     '</style>';
                   htmlToPrint += divToPrint.outerHTML;
                   newWin.document.write(htmlToPrint);
                   newWin.print();
                   newWin.close();
                }}>Print</Button>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          );
  }
}

export class AdvancedControl extends Component {
 constructor(props) {
   super(props);
   this.state = {
     totatelectivesubjects: 0,
     semester: '',
     branch: '',
     error: '',
     show: false,
     showList: false,
     electivelist: [],
     electivesubjectcode: '',
     electivesubjectoption: []
   }
   this.onChange = this.onChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
   this.onChangeSemester = this.onChangeSemester.bind(this);
   this.onAutoAssign = this.onAutoAssign.bind(this);
   //this.generateTable = this.generateTable.bind(this);
   this.onReset = this.onReset.bind(this);
   this.generateElectiveSubjectList = this.generateElectiveSubjectList.bind(this);
   this.onClickGenerateList = this.onClickGenerateList.bind(this);
   this.onChangeElectiveOption = this.onChangeElectiveOption.bind(this);
 }

 onChange(e) {
   e.preventDefault();
   this.setState({
     totalelectivesubjects: e.target.value
   });
 }

 onChangeSemester(e) {
   e.preventDefault();
   this.setState({
     semester: e.target.value
   }, ()=>{
     const faculty_obj = getFromStorage('faculty_obj');
     const { branch } = faculty_obj;
     fetch('/api/facultyaccount/generateelectivelist', {
       method: 'POST',
       headers: {
         'Content-Type':'application/json'
       },
       body: JSON.stringify({
         semester: this.state.semester,
         branch: branch
       })
     })
     .then(res=>res.json())
     .then(json=>{
       if(json.success){
         this.setState({
           electivesubjectoption: json.data[0].electivesubject
         });
       }
     });

     this.generateElectiveSubjectList();
   });
 }

 onSubmit(e) {
   e.preventDefault();

   fetch("/api/facultyaccount/controlelectivesubject", {
     method: 'POST',
     headers: {
       'Content-Type':'application/json'
     },
     body: JSON.stringify({
       semester: this.state.semester,
       branch: this.state.branch,
       totalelectivesubjects: this.state.totalelectivesubjects
     })
   })
   .then(res=>res.json())
   .then(json=>{
     if(json.success) {
       this.setState({
         error: json
       });
       console.log(json.message);
     } else {
       this.setState({
         error: json
       });
     }
   });
 }

 componentWillMount() {
   const { branch } = getFromStorage('faculty_obj');
   this.setState({
     branch: branch
   });
 }

 onAutoAssign(e) {
   e.preventDefault();

   fetch('/api/facultyaccount/allocateelectivesubject', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       branch: this.state.branch,
       semester: this.state.semester
     })
   })
   .then(res=>res.json())
   .then(json=>{
     if(json.success){
       this.setState({
         student: json.student,
         subject: json.subject,
         show: true
       }, ()=>{

       });
       window.alert('Auto Assignment Elective Successfully');
     } else {
       window.alert('Auto Assignment Elective Failed');
     }
   });
 }

  generateElectiveSubjectList() {
      let item = [];
      this.state.electivesubjectoption.forEach((subject, index)=>{
        item.push(<option key={index} value={subject.subjectcode}>{subject.subjectname}</option>)
      });
      return item;
  }

/*
 generateTable() {
   if(this.state.student) {
   let row = this.state.student.map((student, index)=>{
      let rowspanvalue = student.subject.length;
      let lablength = student.lab.length-1;
      let regularrow = student.subject.map((subject, index)=>{
        if(index === 0){
          return;
        }
        if(lablength === 0){
          return (
            <tr key={index}>
              <td>{subject.subjectname}-{subject.subjectcode}</td>
            </tr>
          );
        }
        lablength --;
        return (
          <tr key={index}>
            <td>{subject.subjectname}-{subject.subjectcode}</td>
            <td>{student.lab[index].labname} - {student.lab[index].labcode}</td>
          </tr>
        );
      });
      return (
        <>
        <tr key={index}>
          <td rowSpan={rowspanvalue.toString()}>{student.regNo}</td>
          <td rowSpan={rowspanvalue.toString()}>{student.currentsem}</td>
          <td rowSpan={rowspanvalue.toString()}>{student.branch}</td>
          <td rowSpan={rowspanvalue.toString()}>{student.sec}</td>
          <td>{student.subject[0].subjectname}-{student.subject[0].subjectcode}</td>
          <td>{student.lab[0].labname}-{student.lab[0].labcode}</td>
        </tr>
        {
          regularrow
        }
        </>
      );
   });


   return(
     <MDBTable bordered small scrollY>
      <MDBTableHead color="black">
        <tr>
          <th>RegNo</th>
          <th>Semester</th>
          <th>Branch</th>
          <th>Section</th>
          <th>Subjects</th>
          <th>Labs</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
          row
        }
      </MDBTableBody>
     </MDBTable>
   );
 } else {
   return null;
 }
 }
*/

 onReset() {
   const faculty_obj = getFromStorage('faculty_obj');
   const { branch } = faculty_obj;

   fetch('/api/facultyaccount/resetsemesteracademicdetail', {
     method: 'POST',
     headers: {
       'Content-Type':'application/json'
     },
     body: JSON.stringify({
       branch: branch,
       semester: this.state.semester
     })
   })
   .then(res=>res.json())
   .then(json=>{
     if(json.success) {
       window.alert('Reset Successfull');
     } else {
       window.alert('Reset unsucessful');
     }
   });
 }

 onClickGenerateList() {
   const faculty_obj = getFromStorage('faculty_obj');
   const { branch } = faculty_obj;

   if(this.state.semester && this.state.electivesubjectcode){
     fetch('/api/facultyaccount/generateelectivesubjectallotmentlist', {
       method: 'POST',
       headers: {
         'Content-Type':'application/json'
       },
       body: JSON.stringify({
         semester: this.state.semester,
         branch: branch,
         subjectcode: this.state.electivesubjectcode
       })
     })
     .then(res=>res.json())
     .then(json=>{
       if(json.success) {
         this.setState({
           electivelist: json.data,
           showList: true
         }, ()=>{
           console.log(this.state.electivelist);
         });
       } else {
         window.alert('Failed to generate list');
       }
     });

   } else {
     window.alert('Please select semester and electivesubject to generate list');
   }
 }

 onChangeElectiveOption(e) {
   this.setState({
     electivesubjectcode: e.target.value
   }, ()=>{
     console.log(this.state.electivesubjectcode);
   });
 }

 render() {
   let modalClose = () => this.setState({show: false});
   let modalShow = () => this.setState({show: true});
   let modalShowList = () => this.setState({showList: true});
   let modalCloseList = () => this.setState({showList: false});
   const { branch } = getFromStorage('faculty_obj');
   const {
     totalelectivesubjects
   } = this.state;
   return (
     <div className="Advanced-control-main-frame">

      <div className="limit-elective-main-frame">
      <div>
        <h5>Control no of elective subjects per student per semester</h5>
      </div>
      <form>
        <label>Select Semester: &nbsp;</label>
        <select name="Semester" onChange={this.onChangeSemester}>
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>

        <div className="input-text-elective-count">
        <label>No. of Elective subjects: &nbsp;</label>
        <input type="text"
               placeholder="Number of elective subjects"
               value={totalelectivesubjects}
               onChange={this.onChange}
               required/>

       <input type="submit" onClick={this.onSubmit}/>
       </div>
      </form>
      </div>
      <div className="AssignElective-main-frame">
        <h5>Click the button to Auto Assign Elective Subjects based in CGPA</h5>
        <div>
        <label>Select Semester: &nbsp;</label>
          <select name="Semester" onChange={this.onChangeSemester}>
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <label>Branch: </label>
            <input type="text" placeholder={branch} disabled/>
            <input type="submit" value="Auto Assign Elective Subjects" onClick={this.onAutoAssign}/>
            <div className="reset-btn">
              <input type="submit" value="RESET" onClick={this.onReset}/>
            </div>
        </div>
      </div>
      <div className="Generate-List-Elective-Student-Frame">
        <h5>Generate List Elective Allotment</h5>
        <div>
          <label>Select Semester: &nbsp;</label>
          <select name="Semester" onChange={this.onChangeSemester}>
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <label>Branch: &nbsp; </label>
          <input type="text" placeholder={branch} disabled/>
          <label>Select Elective: &nbsp;</label>
          <select name="ElectiveSubject" onChange={this.onChangeElectiveOption}>
            <option>Select Elective Subject</option>
            {
              this.generateElectiveSubjectList()
            }
          </select>
          <Button onClick={this.onClickGenerateList}>GenerateList</Button>
        </div>
      </div>
      <div className="student-data-table-main-frame">
      <StudentAllotmentModal
      show={this.state.show}
      onHide={modalClose}
      student={this.state.student}
      semester={this.state.semester}/>
      <ElectiveListGenerateModal
        show={this.state.showList}
        onHide={modalCloseList}
        student = {this.state.electivelist}
        semester={this.state.semester}
        subjectcode = {this.state.electivesubjectcode}
      />
      </div>
     </div>
   )
 }
}
