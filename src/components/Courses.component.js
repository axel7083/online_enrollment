import React, {Component} from "react";
import axios from 'axios';
import {Table, ButtonGroup,Button } from "react-bootstrap";
import Cookie from "js-cookie";

const tableStyle = {
    'paddingLeft': '50px',
    'paddingRight': '50px'
};

const buttonStyle = {
    'padding': '20px'
};

export default class Courses extends Component {
    constructor(props) {
        super(props);

        this.updateTable = this.updateTable.bind(this);
        this.setPage = this.setPage.bind(this);

        this.state = {
            data: [],
            page: 1,
            nbOfPage: -1,
            buttonsGroup: []
        };

    }

    //Right before anything load the page this is called
    componentDidMount() {
        this.updateTable();
    }

    updateTable()
    {
        axios.get('http://localhost:5000/courses?page=' + this.state.page + '&token=' + Cookie.get('token') + "&userId="+Cookie.get('userId'))
            .then(res => {
                let nbOfPage = res.data.nbOfPage;

                let btns = [];
                let start;
                if(this.state.page <= 1)
                    start = 1;
                else if(nbOfPage>0 && this.state.page>=nbOfPage)
                    start = nbOfPage-2;
                else
                    start = this.state.page - 1;

                for(var i = start; i < start+3; i++)
                {
                    btns.push(i);
                }

                this.setState({
                    buttonsGroup: btns,
                    data: (res.data.array),
                    nbOfPage: nbOfPage
                })

            })
            .catch(err => {

            });
    }

    setPage(page)
    {
        //TODO: remove the ugly animation of the button when you click on it
        console.log("Select page: " + page);
        this.state.page = page; //Manual change because we don't care and are thugs
        this.updateTable();
    }


    render() {
        return (
            <div style={tableStyle} className="mx-auto" >
            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Lecturer</th>
                    <th>AcademicUnit</th>
                    <th>prerequisite</th>
                </tr>
                </thead>
                <tbody>
                {this.state.data.map(function(item, i){
                    return <tr key={i}>
                        <td>{item.course_id}</td>
                        <td><a href={"https://ecampus.ius.edu.ba/" + item.Url}>{item.course_name}</a></td>
                        <td>{item.Lecturer}</td>
                        <td>{item.AcademicUnit}</td>
                        <td>{item.prerequisite.map(item => {return item + ' '})}</td>
                    </tr>
                })}
                </tbody>
            </Table>
                <div className="mx-auto text-center" style={buttonStyle}>
                    <ButtonGroup aria-label="Pagination">
                        <Button variant="secondary" href={"#Page: 1"} onClick={() => this.setPage(1)}>First</Button>
                        {this.state.buttonsGroup.map((item,i) =>{
                            return <Button href={"#Page:" + item} variant={(item!==this.state.page)?"secondary":"primary"} key={i} onClick={() => this.setPage(item)}>{item}</Button>
                        })}
                        <Button variant="secondary" href={"#Page:" + this.state.nbOfPage} onClick={() => this.setPage(this.state.nbOfPage)}>Last</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
