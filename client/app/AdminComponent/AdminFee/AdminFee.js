import React from 'react';
import { AdminFeeSideBar } from './AdminFeeSideBar';
import { Route } from 'react-router-dom';
import { AdminAddFeeStruture } from './AdminAddFeeStructure';
import { AdminUpdateFeeStructure } from './AdminUpdateFeeStructure';
import './AdminFee.css';

export class AdminFee extends React.Component {
  render() {
    return (
      <div className="AdminFee-main-frame">
        <div className="AdminFee-SideBar-main-frame">
         <AdminFeeSideBar />
        </div>
        <div className="AdminFee-body-main-frame">
          <Route path="/adminaccount/fee/addfeestructure" component = {AdminAddFeeStruture} />
          <Route path="/adminaccount/fee/updatefeestructure" component = {AdminUpdateFeeStructure} />
        </div>
      </div>
    );
  }
}
