import React from 'react';
import ReactDOM from 'react-dom';
import { getFromStorage, setInStorage, removeFromStorage } from '../../Util/LocalStorage';
import './login.css';
import loginImage from './login_image.png';

import { Home } from '../Home/Home';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';



class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      token: '',
      signInError: '',
      signInRegno: '',
      signInPassword: '',
      signInError: '',
    }


    this.onTextBoxChangeRegno = this.onTextBoxChangeRegno.bind(this);
    this.onTextBoxChangePassword = this.onTextBoxChangePassword.bind(this);

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  };

  componentDidMount() {
    const obj = getFromStorage('student_info_app');
    if(obj && obj.token){
      const { token } = obj;
      console.log(token);
      fetch('/api/account/verify?token='+token)
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
      //console.log('here');
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

    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        regNo: signInRegno,
        password: signInPassword
      }),
    })
    .then(res=>res.json())
    .then(json=>{
      if(json.success){
        setInStorage('student_info_app', {token: json.token});
        this.setState({
          signInError: json.message,
          isLoading: false,
          token: json.token
        });
        const { from } = this.props.location.state || { from: {pathname: "/account"}};
        this.props.history.push(from);
        //alert('Sign in successfull');
      } else {
        this.setState({
          signInError: json.message,
          isLoading: false
        });
      //  alert('Sign in unsucessfull');
      }
    });
  }


  onLogout() {
    this.setState({
      isLoading: true
    });

    const obj = getFromStorage('student_info_app');
    if(obj && obj.token) {
      const { token } = obj;
      fetch('/api/account/logout?token='+token)
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            token: '',
            isLoading: false
          });
          removeFromStorage('student_info_app');
          removeFromStorage('studentObj');
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    }
  }

  render(){
    const {
      signInError,
      signInRegno,
      signInPassword,
      token,
      isLoading
    } = this.state;


    if(isLoading) {
      return (
        <div>
          <p>Loading ...</p>
        </div>
      );
    }

        return (
          <div className = "login-main-frame">
            <div className="top-login-form">
                <img src={loginImage} alt="login_image"/>
                <h3>SMIT Student Information Portal</h3>
            </div>

            <div className = "bottom-login-form">
              <div className="reg-no-form">
                <label htmlFor="reg-no">Regno</label><br />
                <input type="text"
                       className="reg-no-login-input"
                       placeholder="Registration Number"
                       value={signInRegno}
                       onChange={this.onTextBoxChangeRegno}/><br />
              </div>
              <div className="password-form">
                <label htmlFor="password">Password</label><br />
                <input type="password"
                       placeholder="Password"
                       value={signInPassword}
                       onChange={this.onTextBoxChangePassword}/><br / >
              </div>
              <input type="submit" value="Login" onClick={this.onLogin}/><br />
              <br />
              {
                (signInError && signInError!="ValidSignin")? (<p>{signInError}</p>):(null)
              }
            </div>
          </div>
        );
  }
};


export default Login;


/*

    return (
        <div className="home-login-main-frame">
          <Home token={token} onlogoutfunc={this.onLogout} props={this.props}/>
        </div>
    );
*/
//<Home token={token} onlogoutfunc={this.onLogout} />
