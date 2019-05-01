import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './FeeDepartmentUpdateFee.css';
import { FeeDepartmentUpdateManyFee } from './FeeDepartmentUpdateManyFee';
import { FeeDepartmentUpdateFeeOne } from './FeeDepartmentUpdateFeeOne';

export class FeeDepartmentUpdateFee extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FeeDepartmentUpdateFee-main-frame">
        <Tabs defaultActiveKey="Update-Multiple-Fees" id="uncontrolled-tab-example">
          <Tab eventKey="Update-Multiple-Fees" title=<i className="fas fa-arrow-alt-circle-down"> Update Multiple Fees</i>>
            <FeeDepartmentUpdateManyFee />
          </Tab>
          <Tab eventKey="Update-Single-Fee" title=<i className="fas fa-arrow-alt-circle-down"> Update Single Fees</i>>
            <FeeDepartmentUpdateFeeOne />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
