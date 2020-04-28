import React, {Component} from "react";
import axios from 'axios';
import {Card} from "react-bootstrap";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRePassword = this.onChangeRePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            repassword: ''
        };

    }

    //Right before anything load the page this is called
    componentDidMount() {
        this.setState({
            username: "@"
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRePassword(e) {
        this.setState({
            repassword: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.username !== this.state.password)
        {
            alert("Error");
            window.location = '/signup';
            return;
        }

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        //Return to the user list
        //window.location = '/';
    }


    render() {
        return (
            <Card style={{width: '18rem'}} className="mx-auto">
                <Card.Body>
                    <Card.Title>Register</Card.Title>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="password"
                                   required
                                   className="form-control"
                                   value={this.state.password}
                                   onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <label>Retype your password: </label>
                            <input type="password"
                                   required
                                   className="form-control"
                                   value={this.state.repassword}
                                   onChange={this.onChangeRePassword}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Sign up" className="btn btn-primary"/>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        );
    }
}
