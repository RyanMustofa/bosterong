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
        axios.get("https://murmuring-thicket-97843.herokuapp.com/api/details",{
            headers: {
                Authorization:"Bearer " + localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res)
            if(res.data.success.level === "admin"){
            this.setState({
                level: "admin"
            })
            }else{
            this.setState({
                level: "user"
            })
            }
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
