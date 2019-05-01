import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { Home } from './components/Home/Home';
import { FeeDepartmentLogin } from './FeeDepartment/FeeDepartmentLogin/FeeDepartmentLogin';
import { FeeDepartmentHome } from './FeeDepartment/FeeDepartmentHome/FeeDepartmentHome';
import { FacultyHome } from './FacultyComponent/FacultyHome/FacultyHome';
import { FacultyLogin } from './FacultyComponent/FacultyLogin/FacultyLogin';
import { AdminLogin } from './AdminComponent/AdminLogin/AdminLogin';
import { AdminHome } from './AdminComponent/AdminHome/AdminHome';
import './index.css';

import { getFromStorage } from './Util/LocalStorage';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import './styles/styles.scss';
import Login from './components/Login/Login'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('student_info_app')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }} />
  )} />
);

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('admin_obj')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/adminlogin',
        state: {from: props.location}
      }} />
  )} />
);

const PrivateRouteFaculty = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('faculty_obj')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/facultylogin',
        state: {from: props.location}
      }} />
  )} />
);

const PrivateRouteFeeDepart = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('feedepart_obj')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/feedepartlogin',
        state: {from: props.location}
      }} />
  )} />
);

class Index extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      token: ''
    }
  }

  render() {
    return (
      <div className="index-main-frame">
      <Router>
          <Switch>
            <Route exact path="/" component={WelcomePage}/>
            <PrivateRoute path="/account" component={Home}/>
            <PrivateRouteFaculty path="/faculty" component={FacultyHome}/>
            <PrivateRouteAdmin path="/adminaccount" component={AdminHome}/>
            <PrivateRouteFeeDepart path="/feedepart" component={FeeDepartmentHome}/>
            <Route path="/feedepartlogin" render={(props)=><FeeDepartmentLogin {...props}/>}/>
            <Route path="/login" render={(props)=><Login {...props}/>}/>
            <Route path="/facultylogin" render={(props)=><FacultyLogin {...props}/>}/>
            <Route path="/adminlogin" render={(props)=><AdminLogin {...props}/>}/>
            <Route component={NotFound}/>
          </Switch>
      </Router>
      </div>

    );
  }
}



render(
<Index />
, document.getElementById('app'));
//
/*

*/
