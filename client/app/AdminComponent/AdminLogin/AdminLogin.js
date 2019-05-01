import React from 'react';
import ReactDOM from 'react-dom';
import { getFromStorage, setInStorage, removeFromStorage } from '../../Util/LocalStorage';
import './login.css';
import loginImage from './login_image.png';
import loginImage1 from '../../../public/assets/img/login_image_3.png';
import loginImage2 from '../../../public/assets/img/login_image_2.png';
//import { Home } from '../Home/Home';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
const loadinggif = require('../../../public/assets/img/loading-gif.gif');

export class AdminLogin extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: '',
      signInError: '',
      signInRegno: '',
      signInPassword: ''
    }

    this.onTextBoxChangeRegno = this.onTextBoxChangeRegno.bind(this);
    this.onTextBoxChangePassword = this.onTextBoxChangePassword.bind(this);

    this.onLogin = this.onLogin.bind(this);
    //this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('admin_obj');
    if(obj && obj.token){
      const { token } = obj;
      //console.log(token);
      fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token: token,
            isLoading: false
          });
          console.log('token is valid');
        } else {
          this.setState({
            isLoading: false
          });
          console.log('token is not valid');
        }
      });
    } else {
      this.setState({
        isLoading: false
      });
      console.log('here');
    }

  }

  onTextBoxChangeRegno(e){
    this.setState({
      signInRegno: e.target.value
    });
  }

  onTextBoxChangePassword(e){
    this.setState({
      signInPassword: e.target.value
    });
  }

  onLogin() {
    const {
      signInRegno,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true
    });

    fetch('/api/admin/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        empId: signInRegno,
        password: signInPassword
      }),
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success) {
        setInStorage('admin_obj', {token: json.token});
        this.setState({
          signInError: json.message,
          isLoading: false,
          token: json.token
        });
        const { from } = this.props.location.state || { from: {pathname: "/adminaccount"}};
        this.props.history.push(from);
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false
        });
      }
    });
  }

  render() {
    const {
      signInError,
      signInRegno,
      signInPassword,
      token,
      isLoading
    } = this.state;


    if(isLoading) {
      return (
        <div className="loading-page">
          <div className="isloading-main-frame">
            <img src = {loadinggif} alt="loading..."/>
          </div>
        </div>
      );
    }

        return (
          <div className="parent-container">
          <div className="login-page-main-frame">
          <div className="login-main-image1">
            
          </div>
          <div className = "login-main-frame">
            <div className = "bottom-login-form">
            <div className="login-form-container">
              <div className="top-login-form-container">
                <h3>Admin Login</h3><br/>
              </div>
              <div className="reg-no-form">
                    <label htmlFor="reg-no">RegNo</label><br />
                    <div className="login-text-box-container">
                    <div className="login-container-image">
                      <img style={{width: '20px', height: '20px'}} src={loginImage1} />
                    </div>
                    <input type="text"
                           className="reg-no-login-input"
                           placeholder="Registration Number"
                           value={signInRegno}
                           onChange={this.onTextBoxChangeRegno}/><br />
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
