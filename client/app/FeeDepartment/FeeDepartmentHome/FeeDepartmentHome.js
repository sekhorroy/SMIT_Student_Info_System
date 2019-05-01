import React, { Component } from 'react';
import { setInStorage, getFromStorage } from '../../Util/LocalStorage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { FeeDepartmentNavBar } from '../FeeDepartmentNavBar/FeeDepartmentNavBar';
import { FeeDepartmentSideBar } from '../FeeDepartmentSideBar/FeeDepartmentSideBar';
import { FeeDepartmentCheckFee } from '../FeeDepartmentCheckFee/FeeDepartmentCheckFee';
import { FeeDepartmentUpdateFee } from '../FeeDepartmentUpdateFee/FeeDepartmentUpdateFee';
import { FeeDepartmentCheckDefaulter } from  '../FeeDeparmentCheckDefaulter/FeeDepartmentCheckDefaulter';
import smitheaderimage from '../../Util/Sikkim-Manipal-University.jpg';

import './FeeDepartmentHome.css';

export class FeeDepartmentHome extends Component {
  render() {
    return (
      <div className="feehome-main-frame">
      <FeeDepartmentNavBar history={this.props.history} location={this.props.location}/>
        <div className="feehome-content-main-frame">
          <FeeDepartmentSideBar history={this.props.history} location={this.props.location}/>
          <div className="fee-home-frame">
            <div className="outer">
              <div className="inner">
                <img src={smitheaderimage}/>
              </div>
            </div>
            <Route path="/feedepart/checkfee" component={FeeDepartmentCheckFee} />
            <Route path="/feedepart/updatefee" component={FeeDepartmentUpdateFee} />
            <Route path="/feedepart/checkdefaulter" component={FeeDepartmentCheckDefaulter} />
          </div>
        </div>
      </div>
    );
  }
}
