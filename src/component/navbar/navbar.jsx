import React from "react";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src="https://lh3.googleusercontent.com/proxy/4RnFw1TbjNMdTGg1AtilHZv2dbpsN1IJJ2YrlePNCvaXpNl5BZOrAWN7hWxR0X-gtZx0j_TONq9N5aCwvecy1Dx5J-qZDmEBUsV6nSOEw4rR3Ok5yLPKF5dX2MzLudMEKg" width="30" height="30" class="d-inline-block align-top mr-2" alt=""/>
                                WismanWisnus
                        </a>

                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        this.props.history.push("/login");
                                    }}
                                >
                                    logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Navbar);
