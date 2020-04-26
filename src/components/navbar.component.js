import React, { Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/" className="nav-link">Users</Link>
                        <Link to="/create" className="nav-link">create</Link>
                        <Link to="/delete" className="nav-link">delete</Link>
                        <Link to="/editor" className="nav-link">editor</Link>
                    </div>
                </div>
            </nav>
        );
    }
}
