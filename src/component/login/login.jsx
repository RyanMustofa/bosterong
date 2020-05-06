import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import toast from "toasted-notes";
import './login.css';
import "toasted-notes/src/styles.css";
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    getApi = () => {
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
            // this.props.levelHandle(res.data.success.level)
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        axios
            .post("https://murmuring-thicket-97843.herokuapp.com/api/login", data)
            .then(res => {
                localStorage.setItem("token", res.data.success.token);
                this.setState({
                    loading: false
                });
                swal({
                    icon: "success",
                    timer: 3000,
                    title: "success login",
                    text: "authorization",
                    button: false
                });
                this.getApi();
                // if(this.state.level === "user"){
                //     this.props.history.push('/add');
                // }else if(this.state.level === "admin"){
                //     this.props.history.push("/");
                // }
            })
            .catch(err => {
                const message = err.response.data.error;
                this.setState({
                    loading: false
                });
                toast.notify(({ onClose }) => (
                    <div
                        className="alert alert-danger alert-dismissible fade show"
                        toggle={onClose}
                        role="alert"
                    >
                        {message}
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ));
            });
    };
    render() {
        // if (localStorage.getItem("token")) {
        //     return <Redirect to="/" />;
        // }
        console.log(this.state.level)
        if(this.state.level === "admin" && localStorage.getItem('token')){
            return <Redirect to="/" />
        }
        if(this.state.level === "user" && localStorage.getItem('token')){
            return <Redirect to="/add" />
        }
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="container">
                            <form onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                {this.state.loading ? (
                                    <button class="disabled btn btn-secondary">
                                        <span
                                            class="spinner-grow spinner-grow-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Loading...
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
