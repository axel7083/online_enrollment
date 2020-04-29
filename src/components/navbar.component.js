import React, { Component} from 'react';
//import { Link } from 'react-router-dom';
import { Navbar, Nav , NavDropdown, Button} from 'react-bootstrap';
import Cookie from "js-cookie"
import axios from 'axios';

const btnStyle = {
    'margin': '5px',
};

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        this.state = {
            isLogin: false,
            buttons: ""
        };

    }

    componentDidMount() {
        /*Check if the user is properly authenticated*/
        if(!Cookie.get('token'))
        {
            this.setState( {buttons: <div>
                    <Button variant="success" style={btnStyle} href="/login">Login</Button>
                    <Button variant="outline-success" style={btnStyle} href="/signup">Sign up</Button>
                </div>});
            return;
        }

        fetch('http://localhost:5000/users/auth?token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'))
            .then(response => {

                if(response.status === 200)
                    this.setState({ buttons: <Button variant="success" style={btnStyle} onClick={this.logout}>logout</Button> });
                else {
                    this.setState( {buttons: <div>
                            <Button variant="success" style={btnStyle} href="/login">Login</Button>
                            <Button variant="outline-success" style={btnStyle} href="/signup">Sign up</Button>
                        </div>});
                    throw new Error(response.status);
                }
            })
            .catch(function(error) {
                console.log("Error detected: " + error);
                /*Possible problem in the session so forcing of deletion of token and userId*/
                Cookie.remove("token");
                Cookie.remove("userId");
            });
    }


    logout()
    {
        axios.get('http://localhost:5000/users/logout?token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'))
            .then(res => {
                Cookie.remove("token");
                Cookie.remove("userId");
                window.location = '/';
            })
            .catch(err => {
                /*alert("Error: " + err);*/ //Very strange beacause we considere it has an error but it is not...
                Cookie.remove("token");
                Cookie.remove("userId");
                window.location = '/';
            });
    }

    render() {


        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#test1">Home</Nav.Link>
                        <Nav.Link href="#test2">Test2</Nav.Link>
                        <NavDropdown title="Courses" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Search a course</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#Miam">Miam</Nav.Link>
                        <Nav.Link eventKey={2} href="#Burk">
                            Burk
                        </Nav.Link>
                    </Nav>
                    {this.state.buttons}
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

