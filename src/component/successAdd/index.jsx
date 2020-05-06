import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar";

class SuccessAdd extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="row-md-12 row-cards">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    Success Menambah Data
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="card-text">
                                    terimakasi menggunakan layanan kami . kami
                                    selalu berusaha memberikan yang terbaik
                                </div>
                                <div className="mt-4">
                                    <Link to="/add" className="btn-primary btn">
                                        Kembali
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuccessAdd;
