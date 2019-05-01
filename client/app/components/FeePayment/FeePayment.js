import React , { Component } from 'react';
import './FeePayment.css';
import 'whatwg-fetch';
import { getFromStorage } from '../../Util/LocalStorage';
import { Tab, Nav } from 'react-bootstrap';
import { FeePaymentModule } from './FeePaymentModule';
import { Row, Col } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
export class FeePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.generateSemesterTabs = this.generateSemesterTabs.bind(this);
  }

  componentDidMount() {
    const studentObj = getFromStorage('studentObj').studentObj;
    //console.log(studentObj);

    fetch('/api/account/getfeedetails', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        branch: studentObj.branch,
        course: studentObj.course,
        currentsem: studentObj.currentsem,
        regNo: studentObj.regNo
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        this.setState({
          semesterfee: json.semesterfee,
          studentfee: json.studentfee
        }, ()=>{
          //console.log(this.state.semesterfee);
          //console.log(this.state.studentfee);
        });
      } else {

      }
    });
  }

  generateSemesterTabs() {
    const studentObj = getFromStorage('studentObj').studentObj;
    if(this.state.semesterfee) {
      let tabs = this.state.semesterfee.semester_fee.map((semester, index)=>{
        return (
          <Nav.Item key={index}>
            <Nav.Link eventKey={semester.semester}>Semester {semester.semester}</Nav.Link>
          </Nav.Item>
        );
      });

      let contents = this.state.semesterfee.semester_fee.map((semester, index)=>{
        return (
          <Tab.Pane eventKey={semester.semester} key={index}>
            <FeePaymentModule semester={semester.semester} semesterfee={this.state.semesterfee} studentfee={this.state.studentfee}/>
          </Tab.Pane>
        );
      });
      return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={studentObj.currentsem}>
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              {
                tabs
              }
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              {
                contents
              }
            </Tab.Content>
          </Col>
        </Row>
        </Tab.Container>

      );
    } else {
      return null;
    }
  }


  render() {
    return (
      <div className="student-feepayment-main-frame">
        <div className="student-feepayment-body-frame">
          {
            this.generateSemesterTabs()
          }
        </div>
      </div>
    );
  }
};

/*


<div className="feepayment-main-frame">
  <div className="feepayment-main-header">
    <h3>SMIT Fee Payment</h3>
  </div>
  <div className="feepayment-main-body">
    <div className="feepayment-cards">
      <div className="fee-main-frame-header">
        <h3>Course Fee</h3>
      </div>
      <div className="fee-main-frame-body">
        <h4>Rs {this.state.coursefee}/-</h4>
      </div>
    </div>
    <div className={this.state.dayscholar? "feepayment-cards-hide":"feepayment-cards"}>
      <div className="fee-main-frame-header">
        <h3>Hostel Fee</h3>
      </div>
      <div className="fee-main-frame-body">
        <h4>Rs {this.state.hostelfee}/-</h4>
      </div>
    </div>
    <div className={this.state.dayscholar? "feepayment-cards-hide":"feepayment-cards"}>
        <div className="fee-main-frame-header">
          <h3>Mess Fee</h3>
        </div>
        <div className="fee-main-frame-body">
          <h4>Rs {this.state.messfee}/-</h4>
        </div>
    </div>
    <div className="feepayment-cards">
      <div className="fee-main-frame-header">
        <h3>Other Fee</h3>
      </div>
      <div className="fee-main-frame-body">
        <h4>Rs {this.state.otherfee}/-</h4>
      </div>
    </div>
    <div className="feepayment-cards-results">
      <div className="fee-main-frame-header">
        <h3>Total Fee</h3>
      </div>
      <div className="fee-main-frame-body">
        <h4>Rs {this.state.totalamount}/-</h4>
      </div>
    </div>
  </div>
  <div className="checkbox-main-frame">
  <div className="checkbox-color-frame">
    <label className="container">Please check the box if your are a dayscholar
      <input type="checkbox" onChange = {this.onChecked}/>
      <span className="checkmark"></span>
    </label>
  </div>
  </div>
  <div className="pay-btn-main-frame">
      <button className="pay-btn"><span>Click to proceed</span></button>
  </div>
</div>


*/

/*
.feepayment-main-frame{
  width: 100%;
  display: block;
  background-color: white;
  height:100%;
  margin-top: 3rem;
}

.feepayment-main-header{
    text-align: center;
    color: #e67300;
    padding: 2rem;
}

.feepayment-main-body {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content:center;
  margin-top: 2rem;
  padding: 2rem;
}

.feepayment-cards {
  color: white;
  margin-top: 1rem;
  width: 12rem;
  height: 12rem;
  border: 1.2rem ;
  background-color: #9999ff;
  text-shadow: 1px 1px 1px #000;
  box-shadow: 0 3px 5px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.55);
  margin-left: 2rem;
  margin-right: 2rem;
}

.feepayment-cards-hide {
  display: none
}

.feepayment-cards-results{
  color: white;
  margin-top: 1rem;
  width: 19rem;
  height: 12rem;
  border: 1.2rem ;
  background-color: #ff8080;
  text-shadow: 1px 1px 1px #000;
  box-shadow: 0 3px 5px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.55);
  margin-left: 2rem;
  margin-right: 2rem;
}

.fee-main-frame-header {
  padding: 1rem;
}

.fee-main-frame-body{
  margin-top: 2rem;
}

.checkbox-main-frame {
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
}



.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  margin-top: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}



.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox
.checkmark {
  position: absolute;
  top: 0;
  left: 0.1rem;
  height: 1.7rem;
  width: 1.7rem;
  background-color: #eee;
  margin-right: 1rem;
}

/*
/* On mouse-over, add a grey background color
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}
*/
/* Create the checkmark/indicator (hidden when not checked)
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked
.container input:checked ~ .checkmark:after {
  display: block;
}

/*

/* Style the checkmark/indicator
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 8px;
  height: 15px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.pay-btn-main-frame {
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin-top: 3rem;

}

.checkbox-color-frame {
  margin: 10px;
}

.pay-btn {
  background-color: #4CAF50; /* Green
  border: none;
  border-radius: 30px;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 24px;
  width: 25%;
  -webkit-transition-duration: 0.5s; /* Safari
  transition-duration: 0.5s;
}

.pay-btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.pay-btn span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.pay-btn:hover {
  background-color: #45a049;
}

.pay-btn:hover span {
  padding-right: 25px;
}

.pay-btn:hover span:after {
  opacity: 1;
  right: 0;
}

@media only screen and (max-width: 600px) {
  .feepayment-cards {
    width: 12rem;
    height: 6rem;
    border: 1.2rem ;
  }
  .feepayment-cards-hide {
    width: 12rem;
    height: 6rem;
    border: 1.2rem ;
  }
  h3, h4 {
    font-size: 1rem;
  }
  .fee-main-frame-body{
    margin-top: 0rem;
  }
  .feepayment-cards-results{
    width: 12rem;
    height: 6rem;
    border: 1.2rem ;
    box-shadow: 0 3px 5px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.55);
  }

  .pay-btn {
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    width: 50%;
  }
}
*/

/*
constructor(props){
  super(props);
  this._isMounted=false;
  this.state = {
    coursefee: 0,
    currentsem: 0,
    hostelfee: 0,
    messfee: 0,
    otherfee: 0,
    ispaid: false,
    dayscholar: false,
    jsonReturnedValue: [],
    isLoading: false,
    totalamount: 0
  }

  this.onChecked = this.onChecked.bind(this);
}

componentDidMount() {
  const studentObj = getFromStorage('studentObj').studentObj;
  //console.log(studentObj);

  if(studentObj){
        //console.log(studentObj.currentsem);
        fetch('/api/account/getallfeedetails?regNo='+studentObj.regNo)
        .then(res=>res.json())
        .then(json => {
          if(json.success){
            this.setState({
              jsonReturnedValue: json.data,
              currentsem: studentObj.currentsem,
              isLoading: false
            });


            if(studentObj.currentsem === "1"){
              this.setState({
                jsonReturnedValue: json.data.firstsem
              });
            }
            if(studentObj.currentsem === "2"){
              this.setState({
                jsonReturnedValue: json.data.secondsem
              });
            }
            if(studentObj.currentsem === "3"){
              this.setState({
                jsonReturnedValue: json.data.thirdsem
              });
            }
            if(studentObj.currentsem === "4"){
              this.setState({
                jsonReturnedValue: json.data.fourthsem
              });
            }
            if(studentObj.currentsem === "5"){
              this.setState({
                jsonReturnedValue: json.data.fifthsem
              });
            }
            if(studentObj.currentsem === "6"){
              this.setState({
                jsonReturnedValue: json.data.sixthsem
              });
            }
            if(studentObj.currentsem === "7"){
              this.setState({
                jsonReturnedValue: json.data.seventhsem
              });
            }
            if(studentObj.currentsem === "8"){
              this.setState({
                jsonReturnedValue: json.data.eightsem
              });
            }

            //console.log(this.state.jsonReturnedValue);
            this.setState({
              coursefee: this.state.jsonReturnedValue.coursefee,
              hostelfee: this.state.jsonReturnedValue.hostelfee,
              messfee: this.state.jsonReturnedValue.messfee,
              otherfee: this.state.jsonReturnedValue.otherfee,
              totalamount: this.state.jsonReturnedValue.coursefee + this.state.jsonReturnedValue.hostelfee + this.state.jsonReturnedValue.messfee + this.state.jsonReturnedValue.otherfee
            });

            //console.log(this.state.coursefee, this.state.hostelfee, this.state.messfee, this.state.otherfee);

          } else {
            this.setState({
              isLoading: false
            })
          }
        });

  } else {
    console.log('student object not found');
  }
}


onChecked() {
  if(this.state.dayscholar === false) {
    this.setState({
      dayscholar: true,
      totalamount: this.state.coursefee + this.state.otherfee
    });
  } else {
    this.setState({
      dayscholar: false,
      totalamount: this.state.coursefee + this.state.otherfee + this.state.hostelfee + this.state.messfee
    });
  }
}
*/
