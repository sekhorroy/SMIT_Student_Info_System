import React from 'react';
const loadinggif = require('../../../public/assets/img/loading-gif.gif');
import './loading.css';

export class Loading extends React.Component {
  render() {
    return (
      <div className="loading-page">
        <div className="isloading-main-frame">
          <img src = {loadinggif} alt="loading..."/>
        </div>
      </div>
    );
  }
}
