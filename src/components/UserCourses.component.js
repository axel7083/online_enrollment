import React, {Component} from "react";
import axios from 'axios';
import {Form, InputGroup, Col, Button, Card, Table} from "react-bootstrap";
import Cookie from "js-cookie";
import {Typeahead} from 'react-bootstrap-typeahead';

const RemoveBtnStyle = {
    'textAlign': 'center'
};

export default class UserCourses extends Component {

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeCourse = this.removeCourse.bind(this);


        this.state = {
            UserCourses: [],
            options: [],
            selected: undefined,
            type: "Regular",
            order: "Primary",
            ref: React.createRef()
        };

    }

    //Right before anything load the page this is called
    componentDidMount() {
        axios.get('http://localhost:5000/users?token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'))
            .then(res => {
                this.setState({UserCourses:res.data.courses});
            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    //InputChange for the course box
    onInputChange(e) {

        if(e.length<3)
            return;

        axios.get('http://localhost:5000/courses/search?value=' + e + '&token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'))
            .then(res => {

                var options = [];

                res.data.forEach((item,index) => {
                    options.push({id:item._id,label:item.course_id+' ' + item.course_name});
                });
                this.setState({options:options});

            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    removeCourse(index)
    {
        console.log(index);
        this.state.UserCourses.splice(index, 1);
        this.setState({UserCourses:this.state.UserCourses});
    }

    addCourse()
    {
        if(this.state.selected === undefined)
            return;

        this.state.UserCourses.push({order:this.state.order,type:this.state.type,course_id:this.state.selected[0].id,code:this.state.selected[0].label.split(' ')[0]});
        this.setState({
            UserCourses:this.state.UserCourses,
            selected: undefined,
            options: []
        });

        this.state.ref.current.clear()
        document.getElementById('coursesSelection')
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submitting");
        console.log(this.state.UserCourses);

        const userCourses = {
            userId:Cookie.get('userId'),
            courses: this.state.UserCourses
        };

        console.log(userCourses);

        axios.post('http://localhost:5000/users/setUserCourses?token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'),userCourses)
            .then(res => {
                console.log(res);
                window.location = '/UserCourses';
            })
            .catch((err) => {
                alert('Error: ' + err);
                window.location = '/UserCourses';
            });


    }

    render() {
        return (
            <Card style={{ width: '80%' }} className="mx-auto">
                <Card.Body>
                    <Card.Title>User courses</Card.Title>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <fieldset disabled>
                                    <Form.Label>User</Form.Label>
                                    <Form.Control placeholder={Cookie.get('userId')} />
                                    </fieldset>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCourse">
                                    <Form.Label>Course</Form.Label>
                                    <Typeahead
                                        id="coursesSelection"
                                        onInputChange={this.onInputChange}
                                        onChange={(selected) => {
                                            this.setState({selected});
                                        }}
                                        options={this.state.options}
                                        ref={this.state.ref}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridType">
                                    <Form.Label>Course type</Form.Label>
                                    <Form.Control as="select" value={this.state.type} onChange={(e) => {
                                        this.setState({
                                            type: e.target.value
                                        });
                                    }}>
                                        <option>Regular</option>
                                        <option>Elective</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridOrder">
                                    <Form.Label>Order</Form.Label><br/>
                                    <InputGroup className="mb-3">
                                        <Form.Control as="select" value={this.state.order} onChange={(e) => {
                                            this.setState({
                                                order: e.target.value
                                            });
                                        }}>
                                            <option>Primary</option>
                                            <option>Secondary</option>
                                        </Form.Control>
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={this.addCourse}>Add</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>

                            <Table responsive striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Type</th>
                                    <th>Order</th>
                                    <th>Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.UserCourses.map((item, i) => {
                                    return <tr key={i}>
                                        <td>{item.code}</td>
                                        <td>{item.type}</td>
                                        <td>{item.order}</td>
                                        <td key={i} style={RemoveBtnStyle} >
                                        <Button variant="danger" onClick={() => this.removeCourse(i)}>Remove</Button></td>
                                    </tr>})}
                                </tbody>
                            </Table>

                            <input type="submit" value="Save" className="btn btn-primary"/>
                        </Form>
                </Card.Body>
            </Card>
        );
    }
}
