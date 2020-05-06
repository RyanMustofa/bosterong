import React from "react";

const Update = ({
    children,
    openEdit,
    data,
    editChange,
    editSubmit,
    loading,
    check
}) => {
    return (
        <>
            <button
                onClick={openEdit}
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                {children}
            </button>
            <div>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Modal title
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={editSubmit} className="form-group">
                                <div className="modal-body">
                                    <div className="container">
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={data.id}
                                        />
                                        <div className="row">
                                            <label className="text-center">
                                                Jumlah Pengunjung
                                            </label>
                                            <input
                                                className="form-control"
                                                type="number"
                                                name="jumlah_pengunjung"
                                                onChange={editChange}
                                                placeholder="Insert Jumlah Pengunjung ..."
                                                value={data.jumlah_pengunjung}
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
                                                name="jumlah_naker"
                                                onChange={editChange}
                                                placeholder="Insert Jumlah Naker ..."
                                                value={data.jumlah_naker}
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
                                                name="jenis_kendaraan"
                                                onChange={editChange}
                                                placeholder="Insert Jenis Kendaraan ..."
                                                value={data.jenis_kendaraan}
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
                                                name="jumlah_kendaraan"
                                                placeholder="Insert Jumlah Kendaraan ..."
                                                onChange={editChange}
                                                value={data.jumlah_kendaraan}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    {loading ? (
                                        <button className="btn btn-secondary">
                                            LOADING ...
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Save changes
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Update;
