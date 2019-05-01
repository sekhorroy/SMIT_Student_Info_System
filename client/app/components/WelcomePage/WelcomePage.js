import React, {Component} from 'react';
import './WelcomePage.css';
import smitheaderimage from '../../Util/Sikkim-Manipal-University.jpg';
import { Nav } from 'react-bootstrap';

export class WelcomePage extends Component {
  render(){
    return (
      <div className="WelcomePage-main-frame">
        <div  className="WelcomePage-frame">
          <div className="outer">
            <div className="inner">
              <img src={smitheaderimage}/>
              <p><strong>Student Information System</strong></p>
            </div>
          </div>
        </div>
        <div className="WelcomePage-body-frame">
          <div className="WelcomePage-card-link">
            <Nav>
              <Nav.Link href="/login"><h2>Student</h2></Nav.Link>
            </Nav>
          </div>
          <div className="WelcomePage-card-link">
            <Nav>
              <Nav.Link href="/facultylogin"><h2>Faculty</h2></Nav.Link>
            </Nav>
          </div>
          <div className="WelcomePage-card-link">
            <Nav>
              <Nav.Link href="/feedepartlogin"><h2>Fee Department</h2></Nav.Link>
            </Nav>
          </div>
        </div>
        <footer>
          <div className="Welcome-footer-frame">
            <h3>Student Information System</h3>
            <h5>Major Project 2019</h5>
            <h4>Under the guidance of Dr.Kalpana Sharma, Head of Department and Vikash Kumar Singh, Assistant Professor</h4>
            <h5>Department of Computer Science And Engineering</h5>
            <h5>Sikkim Manipal institute Of Technology</h5>
          </div>
        </footer>
      </div>
    );
  }
}
