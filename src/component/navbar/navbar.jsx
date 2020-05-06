import React from "react";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a class="navbar-brand" href="#">
                            Navbar
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
