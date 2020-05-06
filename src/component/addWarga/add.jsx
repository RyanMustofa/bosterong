import React from "react";
import "./add.css";
import axios from "axios";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import Navbar from '../navbar/navbar';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jumlah_pengunjung: 0,
            jumlah_naker: 0,
            jenis_kendaraan: "",
            jumlah_kendaraan: 0,
            loading: false
        };
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    submitHandle = e => {
        e.preventDefault();
        const data = {
            jumlah_pengunjung: this.state.jumlah_pengunjung,
            jumlah_naker: this.state.jumlah_naker,
            jenis_kendaraan: this.state.jenis_kendaraan,
            jumlah_kendaraan: this.state.jumlah_kendaraan
        };
        this.setState({
            loading: true
        });
        axios
            .post("http://127.0.0.1:8000/api/warga", data)
            .then(res => {
                this.setState({
                    loading: false
                });
                this.props.history.push("/add/success");
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                toast.notify(({ onClose }) => (
                    <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                    >
                        error delete
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
        return (
            <div className="body">
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-2"></div>
                        <div className="col-md-6 col-sm-8">
                            <div id="ui">
                                <form
                                    onSubmit={this.submitHandle}
                                    className="form-group"
                                >
                                    <h4 className="text-center">
                                        Data Kunjungan WISMAN WISNUS
                                    </h4>
                                    <div className="row">
                                        <label className="text-center">
                                            Jumlah Pengunjung
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            onChange={this.handleChange}
                                            name="jumlah_pengunjung"
                                            placeholder="Insert Jumlah Pengunjung ..."
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <label className="text-center">
                                            Jumlah Naker
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            onChange={this.handleChange}
                                            name="jumlah_naker"
                                            placeholder="Insert Jumlah Naker ..."
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <label className="text-center">
                                            Jenis Kendaraan
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={this.handleChange}
                                            name="jenis_kendaraan"
                                            placeholder="Insert Jenis Kendaraan ..."
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <label className="text-center">
                                            Jumlah Kendaraan
                                        </label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            onChange={this.handleChange}
                                            name="jumlah_kendaraan"
                                            placeholder="Insert Jumlah Kendaraan ..."
                                            required
                                        />
                                    </div>
                                    <div className="row mt-2">
                                        {this.state.loading ? (
                                            <button className="btn btn-secondary btn-block">
                                                LOADING ...
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-block"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;
