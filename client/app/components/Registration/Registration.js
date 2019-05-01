import React from 'react';
import './Registration.css';
import { Form, Modal, Button, Table } from 'react-bootstrap';
import { getFromStorage } from '../../Util/LocalStorage';

class MyVerticallyCenteredModal extends React.Component {
  render() {
    //console.log(this.props.data);
    if(this.props.data.subject && this.props.lab && this.props.chooseelective){

      let regular_row = this.props.data.subject.map((subject, index)=>{
        return (
          <tr key={index}>
            <td>{subject.subjectname}</td>
            <td>{subject.subjectcode}</td>
          </tr>
        );
      });

      console.log(this.props.chooseelective);


        let electivesubject = this.props.chooseelective.map((subject, index)=>{
          return (
            <tr key={index}>
              <td>{subject.subjectname} <span className="registration-modal-span-class"> Priority {index+1} </span></td>
              <td>{subject.subjectcode}</td>
            </tr>
          );
        });

        let lab = this.props.lab.map((subject, index)=>{
          return (
            <tr key={index}>
              <td>{subject.subjectname}</td>
              <td>{subject.subjectcode}</td>
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
              Semester Regiration Confirmation <span className="registration-modal-span-class">Semester: {this.props.semester}</span>  <span className="registration-modal-span-class">Sec: {this.props.sec}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped hover>
              <tbody>
                {
                  regular_row
                }
                {
                  lab
                }
                {
                  electivesubject
                }
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
            <Button variant="primary" onClick={this.props.onRegister}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  }
}


export class Registration extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: [],
        chooseelective: [],
        sec: '',
        show: false,
        semester: '',
        checkFee: false
      }
      //this.renderCompulsorySubject = this.renderCompulsorySubject.bind(this);
      this.onHandleChange = this.onHandleChange.bind(this);
      this.onRegister = this.onRegister.bind(this);
      this.onHandleChangeSection = this.onHandleChangeSection.bind(this);
    }

    componentDidMount() {
      this._isMounted=true;
      const semester = this.props.studentObj.currentsem;
      const branch = this.props.studentObj.branch;

      console.log(this.props.studentObj);
      fetch('/api/account/checkduesregistration', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          regNo: this.props.studentObj.regNo,
          currentsem: semester
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          this.setState({
            checkFee: json.checkFee
          });
        }
      });

      fetch('/api/facultyaccount/getsubjectsbysemester', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          semester: semester,
          branch: branch
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
            if(this._isMounted){
              this.setState({
                data: json.data,
                semester: semester
              });
              const electivesubject = this.state.data.electivesubject;
              if(electivesubject) {
                this.setState({
                  electivesubject: electivesubject

                });
                //console.log(this.state.electivesubject);
              }
              //console.log(this.state.data);
            }
        } else {
          console.log('error in fetching subjects by semester');
        }
      });
    }

    onRegister() {
      const regNo = getFromStorage('studentObj').studentObj.regNo;
      const sec = this.state.sec;
      const semester = this.props.studentObj.currentsem;

      fetch('/api/account/insertstudentacademicresults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          regNo: regNo,
          subject:this.state.data.subject,
          lab: this.state.data.lab,
          chooseelective: this.state.chooseelective,
          currentsem: semester,
          sec: sec
        })
      })
      .then(res=>res.json())
      .then(json=>{
        if(json.success) {
          this.setState({
            show: false
          });

          //console.log("registration complete");
          window.alert('successfully registered');
        } else {
          //console.log("registration incomplete");

          window.alert(json.message);
        }
      });


    }

    onClickRegButton() {
      this.setState({
        show: true
      });
    }

    onHandleChangeSection(e) {
      e.preventDefault();
      const sec = e.target.value
      this.setState({
        sec: sec
      });
    }

    onHandleChange(e) {
      e.preventDefault();
      const selectsubject = e.target.value;
      const electivesubject1 = this.state.electivesubject.filter(subject=>{return subject.subjectname === selectsubject});
      //console.log(electivesubject1[0]);
      const chooseelective = this.state.chooseelective;
      chooseelective.push({
        subjectname: electivesubject1[0].subjectname,
        subjectcode: electivesubject1[0].subjectcode
      });
      const electivesubject = this.state.electivesubject.filter(subject=> {return subject.subjectname!==selectsubject});
      this.setState({
        electivesubject: electivesubject,
        chooseelective: chooseelective
      });
      //console.log(this.state.chooseelective);
    }

    componentWillUnMount() {
      this._isMounted=false;
    }

    render() {
      let modalClose = () => this.setState({ show: false });
      let modelShow = () => this.setState({ show: true });
      if(this.state.checkFee) {
      return (
        <div className="registration-main-frame">
          <div className="inner-registration-main-frame">
            <div className="left-frame">
            <div className="left-frame-header">
              <h3>Non Elective Subjects</h3>
            </div>
            <div className="left-frame-body">
            {

              (this.state.data.subject && this.state.data.subject.length>0)?(
                this.state.data.subject.map((subject, index)=>{
                    return(
                      <div className="coursename-form" key={index}>
                        <label htmlFor="coursename">Subject {index+1}</label>
                        <input type="text"
                               className="coursename-display"
                               placeholder={subject.subjectname}
                               disabled
                               /><br />
                      </div>
                    );
              })
              ):(null)

            }
            {

              (this.state.data.lab && this.state.data.lab.length>0)?(
                this.state.data.lab.map((subject, index)=>{
                    return(
                      <div className="coursename-form" key={index}>
                        <label htmlFor="coursename">Lab {index+1}</label>&nbsp;
                        &nbsp;<input type="text"
                               className="coursename-display"
                               placeholder={subject.subjectname}
                               disabled
                               /><br />
                      </div>
                    );
              })
              ):(null)

            }
            </div>
            </div>
            <div className="right-frame">
              <div className="left-frame-header">
                <h3>Elective Subjects</h3>
              </div>
              <div className="right-frame-body">
                {
                  (this.state.data.electivesubject && this.state.data.electivesubject.length>0)?(
                    this.state.data.electivesubject.map((subject, index)=>{
                      return (
                        <div className="coursename-form" key={index}>
                          <label htmlFor="coursename">Priority {index+1}</label>
                          <select value={this.state.chooseelective} onChange={this.onHandleChange}>
                          <option value="" >Select Subject</option>
                            {
                              (this.state.electivesubject && this.state.electivesubject.length>0)?(
                                this.state.electivesubject.map((subject, index)=>{
                                  return(
                                    <option key={index} value={subject.subjectname}>{subject.subjectname}</option>
                                  );
                                })
                              ):(null)
                            }
                          </select>
                          <br />
                        </div>
                      );
                    })
                  ):(null)
                }
                <div className="Section-input-frame">
                  <select value={this.state.sec} onChange={this.onHandleChangeSection}>
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
          <div className="buttom-frame">
            <input type="submit" value="Click to complete registration" onClick={modelShow}/>
          </div>
          <MyVerticallyCenteredModal
          show={this.state.show}
          onHide={modalClose}
          data={this.state.data}
          sec={this.state.sec}
          semester={this.state.semester}
          chooseelective = {this.state.chooseelective}
          lab={this.state.data.lab}
          onRegister={this.onRegister}/>
        </div>
      );
    } else {
      return (
        <div className="Check-Fee-Detail-main-frame">
          <div className="Info-Detail-Frame">
            <h3>Check Fee Dues In Fee Payment Section To Proceed</h3>
          </div>
        </div>
      );
    }
    }
}
