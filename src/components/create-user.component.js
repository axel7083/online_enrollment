import React, {Component} from "react";
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        };

    }

    //Right before anything load the page this is called
    componentDidMount() {
        this.setState({
            username: "Default"
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

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(user);

        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));

        //Return to the user list
        //window.location = '/';
    }


    render() {
        return (
            <div>
                <h3>Create a new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.password}
                               onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create user" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}
