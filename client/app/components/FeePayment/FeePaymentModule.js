import React from 'react';
import { Button } from 'react-bootstrap';
import { getFromStorage } from '../../Util/LocalStorage';
import { FeePaymentModal } from './FeePaymentModal';
export class FeePaymentModule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coursefee: 0,
      messfee: 0,
      hostelfee: 0,
      miscellaneousfee: 0,
      examfee: 0,
      libraryfine: 0,
      messdeposit: 0,
      otherfee: 0,
      dayscholar: false,
      total: 0,
      show: false,
      studentdetail: ''
    }

    this.onChecked = this.onChecked.bind(this);
    this.dayScholarReduceAmount = this.dayScholarReduceAmount.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    const academicObj = getFromStorage('student_academic_details').academicObj;
    //console.log(academicObj);
    if(this.props.semester) {
      let studentfee = this.props.studentfee.semester_fee.filter((semesterfee) => { return semesterfee.semester === this.props.semester});
      let semesterfee = this.props.semesterfee.semester_fee.filter((semesterfee)=>{return semesterfee.semester === this.props.semester});
      //console.log(semesterfee);
      //console.log(studentfee);

      this.setState({
        coursefee: semesterfee[0].coursefee,
        messfee: semesterfee[0].messfee,
        hostelfee: semesterfee[0].hostelfee,
        miscellaneousfee: semesterfee[0].miscellaneous,
        examfee: studentfee[0].examfee,
        libraryfine: studentfee[0].libraryfine,
        messdeposit: studentfee[0].messdeposit,
        otherfee: studentfee[0].otherfee,
        studentdetail: academicObj,
        total:  semesterfee[0].coursefee +  semesterfee[0].messfee + semesterfee[0].hostelfee + semesterfee[0].miscellaneous + studentfee[0].examfee + studentfee[0].libraryfine +  studentfee[0].messdeposit +  studentfee[0].otherfee
      });

    }
  }

  dayScholarReduceAmount() {
    if(this.state.dayscholar === true) {
      this.setState({
        total: this.state.coursefee + this.state.miscellaneousfee + this.state.examfee + this.state.libraryfine + this.state.otherfee
      }, ()=>{
        console.log(this.state.total);
      });
    } else {
      this.setState({
        total: this.state.coursefee + this.state.messfee + this.state.hostelfee + this.state.miscellaneousfee + this.state.examfee + this.state.libraryfine + this.state.messdeposit + this.state.otherfee
      }, ()=>{
        console.log(this.state.total);
      });
    }
  }

  onChecked() {
    this.setState({
      dayscholar: !this.state.dayscholar
    }, ()=>{
      this.dayScholarReduceAmount()
    });
  }

  showModal() {
    this.setState({
      show: true
    });
  }

  render() {
    //console.log(this.props.studentfee);
    //console.log(this.props.semesterfee);
    let modalClose = () => this.setState({ show: false });
    return (
      <div className="FeePaymentModule-main-frame">
        <div className="FeePaymentModule-header-frame">
          <h5>Fee Payment for Semester: {this.props.semester} RegNo: {this.props.studentfee.regNo}</h5>
        </div>
        <div className="FeePaymentModule-body-frame">
          <div className="FeePaymentModule-body-left-frame">
            <div className="FeePayment-Card">
              <p><span>Course Fee</span>: {this.state.coursefee}</p>
            </div>
            <div className={this.state.dayscholar? "FeePayment-Card-hide":"FeePayment-Card"}>
              <p><span>Mess Fee</span>: {this.state.messfee}</p>
            </div>
            <div className={this.state.dayscholar? "FeePayment-Card-hide":"FeePayment-Card"}>
              <p><span>Hostel Fee</span>: {this.state.hostelfee}</p>
            </div>
            <div className="FeePayment-Card">
              <p><span>Miscellaneous Fee</span>: {this.state.miscellaneousfee}</p>
            </div>
            <div className="FeePayment-Card-Total">
              <p><span>Total Fee</span>: {this.state.total}</p>
            </div>
          </div>
          <div className="FeePaymentModule-body-right-frame">
            <div className="FeePayment-Card">
              <p><span>Exam Fee</span>: {this.state.examfee}</p>
            </div>
            <div className="FeePayment-Card">
              <p><span>Library Fine</span>: {this.state.libraryfine}</p>
            </div>
            <div className={this.state.dayscholar? "FeePayment-Card-hide":"FeePayment-Card"}>
              <p><span>Mess Deposit</span>: {this.state.messdeposit}</p>
            </div>
            <div className="FeePayment-Card">
              <p><span>Other Fee</span>: {this.state.otherfee}</p>
            </div>
          </div>
        </div>
        <div className="FeePaymentModule-check">
          <div className="checkbox-main-frame">
          <div className="checkbox-color-frame">
            <label className="container">Please check the box if your are a dayscholar &nbsp;
              <input type="checkbox" onChange={this.onChecked}/>
            </label>
          </div>
          </div>
        </div>
        <div className="FeePaymentModule-btn">
          <Button onClick={this.showModal}>Pay Fee</Button>
        </div>
        <FeePaymentModal
          show={this.state.show}
          onHide={modalClose}
          studentdetail = {this.state.studentdetail}
          coursefee= {this.state.coursefee}
          hostelfee= {this.state.hostelfee}
          messfee={this.state.messfee}
          miscellaneousfee = {this.state.miscellaneousfee}
          examfee={this.state.examfee}
          libraryfine={this.state.libraryfine}
          messdeposit={this.state.messdeposit}
          otherfee={this.state.otherfee}
          total={this.state.total}
          dayscholar={this.state.dayscholar.toString()}
        />
      </div>
    );
  }
}
