import React from 'react';
import ReactDOM from 'react-dom';
import { getFromStorage, setInStorage, removeFromStorage } from '../../Util/LocalStorage';
import './login.css';
import loginImage from './login_image.png';
import loginImage1 from '../../../public/assets/img/login_image_3.png';
import loginImage2 from '../../../public/assets/img/login_image_2.png';
import { Home } from '../Home/Home';
import { Route, Link, Redirect, withRouter } from 'react-router-dom';
const loadinggif = require('../../../public/assets/img/loading-gif.gif');
import smitheaderimage from '../../Util/Sikkim-Manipal-University.jpg';


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
          removeFromStorage('student_academic_details');
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
            <img src={smitheaderimage}/>
          </div>
          <div className = "login-main-frame">
            <div className = "bottom-login-form">
            <div className="login-form-container">
              <div className="top-login-form-container">
                <h3>Login</h3><br/>
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
};


export default Login;


/*


img {
  width: 75px;
  height: 75px;
  margin: 10px;
  margin-right: 30px;
}

.top-login-form {
  width: 100%;
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5rem;
}

.login-main-frame {
  border: solid 1px;
  border-radius: 15px;
  width: 40rem;
  height: 30rem;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  background-color: #4d4d4d;
  padding: 20px;
  color: white;
  font-family: 'Open Sans', sans-serif;
}

input[type="text"], input[type="password"] {
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 25px;
  border: none;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
}

input[type="submit"] {
  width: 100%;
  background-color: #4CAF50;
  border: none;
  border-radius: 25px;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  position: relative;
  top: 2rem;
  font-family: 'Open Sans', sans-serif;
}

input[type="submit"]:hover {
  background-color: #45a049;
  font-family: 'Open Sans', sans-serif;
}
*/
//<Home token={token} onlogoutfunc={this.onLogout} />
