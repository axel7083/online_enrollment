import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/navbar.component";
import Login from "./components/Login.component";
import SignUp from "./components/SignUp.component";
import Courses from "./components/Courses.component";
import UserCourses from "./components/UserCourses.component";

const containerStyle = {
    'maxWidth': '100%',
    'paddingLeft': '0px',
    'paddingRight': '0px'
};


function App() {
  return (
      <Router>
          <div className="container" style={containerStyle}>
            <Navigation />
            <br/>
            <Route path="/login" component={Login}/>
            <Route path="/Signup" component={SignUp}/>
            <Route path="/Courses" component={Courses}/>
            <Route path="/UserCourses" component={UserCourses}/>
        </div>
      </Router>
  );
}

export default App;
