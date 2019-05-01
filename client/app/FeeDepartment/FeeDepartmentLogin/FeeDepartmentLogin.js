import React from 'react';
import ReactDOM from 'react-dom';
import { getFromStorage, setInStorage, removeFromStorage} from '../../Util/LocalStorage';
//import './FacultyLogin.css';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
const loadinggif = require('../../../public/assets/img/loading-gif.gif');
import loginImage from './login_image.png';
import loginImage1 from '../../../public/assets/img/login_image_3.png';
import loginImage2 from '../../../public/assets/img/login_image_2.png';
import Loader from 'react-loader-spinner'

export class FeeDepartmentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: '',
      signInError: '',
      signInEmpId: '',
      signInPassword: '',
    }
    this.onTextBoxChangeEmpId = this.onTextBoxChangeEmpId.bind(this);
    this.onTextBoxChangePassword = this.onTextBoxChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);

  }

  componentDidMount(){
    const obj = getFromStorage('feedepart_obj');

    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/feedepartment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      })
      .then(res=>res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token: token,
            isLoading: false
          });
          console.log('token is valid Fee Department');
        } else {
          this.setState({
            isLoading: false
          });
          console.log('token is invalid');
        }
      });
    }
  }

  onTextBoxChangeEmpId(e){
    this.setState({
      signInEmpId: e.target.value
    });
  }

  onTextBoxChangePassword(e){
    this.setState({
      signInPassword: e.target.value
    });
  }

  onLogin() {
    const {
      signInEmpId,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true
    });

    fetch('/api/feedepartment/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        empId: signInEmpId,
        password: signInPassword
      })
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success){
        setInStorage('feedepart_obj', {token: json.token, empId: signInEmpId, branch: json.branch});
        this.setState({
          signInError: json.message,
          isLoading: false,
          token: json.token,
        });
        const { from } = this.props.location.state || { from: {pathname: "/feedepart"}};
        this.props.history.push(from);
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false
        });
      }
    })
  }

  render(){
    const {
      signInError,
      signInEmpId,
      signInPassword,
      isLoading,
      token
    } = this.state;


    if(isLoading) {
      return (
        <div className="Loader-main-frame">
          <Loader
             type="Bars"
             color="#00BFFF"
             height="100"
             width="100"
          />
        </div>
      );
    }


    return(
      <div className="parent-container">
      <div className="login-page-main-frame">
      <div className="login-main-image1">
        
      </div>
      <div className = "login-main-frame">
        <div className = "bottom-login-form">
        <div className="login-form-container">
          <div className="top-login-form-container">
            <h3>Employee Login</h3><br/>
          </div>
          <div className="reg-no-form">
                <label htmlFor="reg-no">EmpId</label><br />
                <div className="login-text-box-container">
                <div className="login-container-image">
                  <img style={{width: '20px', height: '20px'}} src={loginImage1} />
                </div>
                <input type="text"
                       className="reg-no-login-input"
                       placeholder="Employee_Id"
                       value={signInEmpId}
                       onChange={this.onTextBoxChangeEmpId}/><br />
                </div>
          </div><br/>
          <div className="password-form">
                <label htmlFor="password">Password</label><br />
                <div className="login-text-box-container">
                <div className="login-container-image">
                  <img style={{width: '20px', height: '20px'}} src={loginImage2} />
                </div>
                <input type="password"
                       placeholder="Password"
                       value={signInPassword}
                       onChange={this.onTextBoxChangePassword}/><br / >
                </div>
          </div>
          <br />
          <input type="submit" value="Login" onClick={this.onLogin}/><br />
          <br />
          <br />
              {
                (signInError && signInError!="ValidSignin")? (<p>{signInError}</p>):(null)
              }
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
