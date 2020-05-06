import React from "react";
import axios from "axios";
import Update from "../update/update";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import { Redirect } from "react-router-dom";
import ReactToExcel from "react-html-table-to-excel";

class Warga extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            formEdit: {
                id: 0,
                jumlah_pengunjung: 0,
                jumlah_naker: 0,
                jenis_kendaraan: "",
                jumlah_kendaraan: 0
            },
            loadingedit: false,
            loading: true,
            loadingdelete: false,
            check: false,
            id: 0
        };
    }
    componentDidMount() {
        this.getApi();
    }
    getApi = () => {
        axios
            .get("https://murmuring-thicket-97843.herokuapp.com/api/warga")
            .then(res => {
                this.setState({
                    data: res.data.data,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    message: "data not found or check your internet",
                    loading: false
                });
            });
    };
    handleDelete = id => {
        this.setState({
            loadingdelete: true,
            id: id
        });
        axios
            .delete(
                "https://murmuring-thicket-97843.herokuapp.com/api/warga/" + id
            )
            .then(res => {
                this.getApi();
                this.setState({
                    loadingdelete: false
                });
            })
            .catch(err => {
                this.setState({
                    loadingdelete: false
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
    openEdit = id => {
        axios
            .get(
                "https://murmuring-thicket-97843.herokuapp.com/api/warga/" + id
            )
            .then(res => {
                this.setState({
                    formEdit: res.data.id
                });
            });
    };
    editSubmit = e => {
        e.preventDefault();
        this.setState({
            loadingedit: true
        });
        axios
            .put(
                "https://murmuring-thicket-97843.herokuapp.com/api/warga/" +
                    this.state.formEdit.id,
                this.state.formEdit
            )
            .then(res => {
                this.setState({
                    loadingedit: false,
                    check: true
                });
                toast.notify(({ onClose }) => (
                    <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        success update data
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
                this.getApi();
            })
            .catch(err => {
                this.setState({
                    loadingedit: false
                });
                toast.notify(({ onClose }) => (
                    <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                    >
                        error update
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
    editChange = e => {
        this.setState({
            formEdit: {
                ...this.state.formEdit,
                [e.target.name]: e.target.value
            }
        });
    };
    render() {
        if (localStorage.getItem("token") === null) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="container mt-5">
                <div>
                    <div className="row-md-12 row-cards">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-8 col-sm-6">
                                        <h3 className="card-title">
                                            Data Kunjungan
                                        </h3>
                                    </div>
                                    <div className="col-md-2 col-sm-3">
                                        <ReactToExcel
                                            className="btn btn-success"
                                            table="table_warga"
                                            filename="data-pengunjung"
                                            sheet="sheet 1"
                                            buttonText="EXPORT TO EXCEL"
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-3">
                                        <button
                                            className="btn-danger btn"
                                            onClick={() => {
                                                localStorage.removeItem(
                                                    "token"
                                                );
                                                this.props.history.push(
                                                    "/login"
                                                );
                                            }}
                                        >
                                            logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {this.state.loading ? (
                                    <div className="text-center">
                                        <div
                                            className="spinner-grow"
                                            style={{
                                                width: "3rem",
                                                height: "3rem"
                                            }}
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="table-responsive service">
                                        <table
                                            id="table_warga"
                                            className="table table-bordered table-hover mb-0 text-nowrap css-serial"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>ID DATA</th>
                                                    <th>Nama</th>
                                                    <th>Nik</th>
                                                    <th>Alamat</th>
                                                    <th>Jenis Pekerjaan</th>
                                                    <th>Update</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            {this.state.data.length > 0 ? (
                                                this.state.data.map(
                                                    (param, i) => {
                                                        return (
                                                            <tbody key={i}>
                                                                <tr>
                                                                    <td>
                                                                        {i + 1}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            param.id
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            param.jumlah_pengunjung
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            param.jumlah_naker
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            param.jenis_kendaraan
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            param.jumlah_kendaraan
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <Update
                                                                            openEdit={() =>
                                                                                this.openEdit(
                                                                                    param.id
                                                                                )
                                                                            }
                                                                            editChange={
                                                                                this
                                                                                    .editChange
                                                                            }
                                                                            editSubmit={
                                                                                this
                                                                                    .editSubmit
                                                                            }
                                                                            data={
                                                                                this
                                                                                    .state
                                                                                    .formEdit
                                                                            }
                                                                            loading={
                                                                                this
                                                                                    .state
                                                                                    .loadingedit
                                                                            }
                                                                            check={
                                                                                this
                                                                                    .state
                                                                                    .check
                                                                            }
                                                                        >
                                                                            edit
                                                                        </Update>
                                                                    </td>
                                                                    <td>
                                                                        {this
                                                                            .state
                                                                            .id ===
                                                                        param.id ? (
                                                                            this
                                                                                .state
                                                                                .loadingdelete ? (
                                                                                <button className="disabled btn btn-secondary">
                                                                                    <span
                                                                                        className="spinner-grow spinner-grow-sm"
                                                                                        role="status"
                                                                                        aria-hidden="true"
                                                                                    ></span>
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    onClick={() =>
                                                                                        this.handleDelete(
                                                                                            param.id
                                                                                        )
                                                                                    }
                                                                                    className="btn btn-danger"
                                                                                >
                                                                                    delete
                                                                                </button>
                                                                            )
                                                                        ) : (
                                                                            <button
                                                                                onClick={() =>
                                                                                    this.handleDelete(
                                                                                        param.id
                                                                                    )
                                                                                }
                                                                                className="btn btn-danger"
                                                                            >
                                                                                delete
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            {this.state.message}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Warga;
