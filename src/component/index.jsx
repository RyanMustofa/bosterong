import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Select extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            level: ""
        }
    }
    componentDidMount(){
        this.setState({
            level:localStorage.getItem('level')
        })
    }
    render(){
        if(this.state.level === "admin"){
            return <Redirect to="/admin"/>
        }
        if(this.state.level === "user"){
            return <Redirect to="/add"/>
        }
        if(localStorage.getItem('token') === null){
            return <Redirect to="/login"/>
        }
        return(
            <div></div>
        )
    }
}

export default Select;
