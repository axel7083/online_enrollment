import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import UserList from "./components/user-list.component";
import CreateUser from "./components/create-user.component";
import DeleteUser from "./components/delete-user.component";
import EditUser from "./components/edit-user.component";
import CodeEditor from "./components/code-editor.component";


function App() {
  return (
      <Router>
          <div className="container">
            <Navbar />
            <br/>
            <Route path="/" exact component={UserList}/>
            <Route path="/create" component={CreateUser}/>
            <Route path="/delete" component={DeleteUser}/>
            <Route path="/edit" component={EditUser}/>
            <Route path="/editor" component={CodeEditor}/>
        </div>
      </Router>
  );
}

export default App;
