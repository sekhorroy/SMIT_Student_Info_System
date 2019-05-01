import React, { Component } from 'react';
import 'whatwg-fetch';
import Navigationbar from '../Navbar/Navigationbar';
import StudentDetails from '../StudentDetails/StudentDetails';
import { Registration }from '../Registration/Registration';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './Home.css';
import { FeePayment } from '../FeePayment/FeePayment';
import { getFromStorage, setInStorage } from '../../Util/LocalStorage';
import { Loading } from '../Loading/Loading';
import { StudentQuiz } from '../StudentQuiz/StudentQuiz';
import smitheaderimage from '../../Util/Sikkim-Manipal-University.jpg';
//import { FooterClass } from '../Footer/Footer';
export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      regNo: '',
      isLoading: false,
      jsonReturnedValue: []
    };

  }

  componentDidMount() {
    this._isMounted=true;
    const obj = getFromStorage('student_info_app');
    //console.log(obj.token);
    if(this._isMounted){
    this.setState({
      token: obj.token
    });

    if(!this.state.token){
      this.setState({
        isLoading: true
      });

       fetch('/api/account/getdetails?token='+obj.token)
      .then(res => res.json())
      .then(json => {
        if(json.success){

          this.setState({
            jsonReturnedValue: json.data,
            isLoading: false
          });
          setInStorage('studentObj', {studentObj: this.state.jsonReturnedValue});

          //console.log(getFromStorage('studentObj'));
          //console.log(this.props.token);
          //console.log(this.state.jsonReturnedValue);
        } else {
          this.setState({
            isLoading: false,
          });
          //console.log('error in fetch', token);
        }
      });
    } else{
        console.log("no token");
    }
    }
  }

  componentWillUnMount() {
    this._isMounted=false;
  }

  render() {
    //console.log("here", this.state.jsonReturnedValue);
    const studentObj = this.state.jsonReturnedValue;

    if(this.state.isLoading){
      return <Loading />;
    }


    return(
      <div className="home-main-frame">
        <div className="navbar-main-frame">
          <Navigationbar studentObj={this.state.jsonReturnedValue} onLogoutfunc={this.props.onlogoutfunc} history={this.props.history} location={this.props.location}/>
        </div>
        <div className="outer">
          <div className="inner">
            <img src={smitheaderimage}/>
          </div>
        </div>
        <Route exact path="/account" render={(props)=><StudentDetails studentObj={this.state.jsonReturnedValue} {...props}/>}/>
        <Route path="/account/feepayment" render={(props)=><FeePayment studentObj={this.state.jsonReturnedValue} {...props}/>}/>
        <Route path="/account/registration" render={(props)=><Registration studentObj = {this.state.jsonReturnedValue} {...props}/>}/>
        <Route path="/account/takequiz" render={(props)=><StudentQuiz studentObj = {this.state.jsonReturnedValue} {...props}/>}/>
        <div className="footer-content">
          <h4>Major Project 2019</h4>
          <h4>Student Information System</h4>
          <h6>Under the guidance of Dr.Kalpana Sharma, HOD and Asst.Prof Vikash Kumar Singh, Assistent Professor</h6>
          <h5>Department Computer Science And Engineering</h5>
          <h6>Sikkim Manipal Institute Of Technology</h6>
        </div>
      </div>
    );
  }
}

//
