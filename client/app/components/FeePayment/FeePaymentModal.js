import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { getFromStorage } from '../../Util/LocalStorage';

export class FeePaymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.generateTable = this.generateTable.bind(this);
    this.onPay = this.onPay.bind(this);
  }

  onPay() {
    const studentObj = getFromStorage('student_academic_details').academicObj;
    const semester = studentObj.currentsem;
    const regNo = studentObj.regNo;
    fetch('/api/feedepartment/payfeedemo', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        semester: semester,
        regNo: regNo
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

  generateTable() {
    if(this.props.dayscholar === "true") {
        return (
          <div>
          <Table celled>
           <Table.Body>
             <Table.Row>
               <Table.Cell><b>RegNo: </b></Table.Cell>
               <Table.Cell>{this.props.studentdetail.regNo}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>Semester: </b></Table.Cell>
               <Table.Cell>{this.props.studentdetail.currentsem}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>Order_ID</b></Table.Cell>
               <Table.Cell>SMITFEEPAY/{this.props.studentdetail.regNo}/SEM{this.props.studentdetail.currentsem}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>Transc_ID</b></Table.Cell>
               <Table.Cell>N/A</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>COURSE_FEE</b></Table.Cell>
               <Table.Cell>{this.props.coursefee}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>EXAM_FEE</b></Table.Cell>
               <Table.Cell>{this.props.coursefee}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>LIBRARY_FINE</b></Table.Cell>
               <Table.Cell>{this.props.libraryfine}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>OTHER_FEE</b></Table.Cell>
               <Table.Cell>{this.props.otherfee}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.Cell><b>TOTAL_FEE</b></Table.Cell>
               <Table.Cell>{this.props.total}</Table.Cell>
             </Table.Row>
           </Table.Body>
          </Table>
          </div>
        );
    } else {
        return (
          <div>
          <Table celled>
             <Table.Body>
               <Table.Row>
                 <Table.Cell><b>RegNo: </b></Table.Cell>
                 <Table.Cell>{this.props.studentdetail.regNo}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>Semester: </b></Table.Cell>
                 <Table.Cell>{this.props.studentdetail.currentsem}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>Order_ID</b></Table.Cell>
                 <Table.Cell>SMITFEEPAY/{this.props.studentdetail.regNo}/{this.props.studentdetail.branch}/SEM{this.props.studentdetail.currentsem}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>Transc_ID</b></Table.Cell>
                 <Table.Cell>N/A</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>DAY_SCHOLAR</b></Table.Cell>
                 <Table.Cell>{this.props.dayscholar}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>COURSE_FEE</b></Table.Cell>
                 <Table.Cell>{this.props.coursefee}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>HOSTEL_FEE</b></Table.Cell>
                 <Table.Cell>{this.props.hostelfee}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>MESS_FEE</b></Table.Cell>
                 <Table.Cell>{this.props.messfee}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>MISCELLANOUS_FEE</b></Table.Cell>
                 <Table.Cell>{this.props.miscellaneousfee}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>EXAM_FEE</b></Table.Cell>
                 <Table.Cell>{this.props.coursefee}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>LIBRARY_FINE</b></Table.Cell>
                 <Table.Cell>{this.props.libraryfine}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>OTHER_FEE</b></Table.Cell>
                 <Table.Cell>{this.props.otherfee}</Table.Cell>
               </Table.Row>
               <Table.Row>
                 <Table.Cell><b>TOTAL_FEE</b></Table.Cell>
                 <Table.Cell>{this.props.total}</Table.Cell>
               </Table.Row>
             </Table.Body>
            </Table>
          </div>
        );
    }
  }

  render() {
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5>Fee Payment RegNo-{this.props.studentdetail.regNo} Semester-{this.props.studentdetail.currentsem} Branch-{this.props.studentdetail.branch} {this.props.dayscholar}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
              this.generateTable()
          }
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        <Button onClick={this.onPay}>Pay</Button>
      </Modal.Footer>
      </Modal>
    );
  }
}
