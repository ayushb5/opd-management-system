import { NavLink } from "react-router-dom"

function AddPatient() {
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>Add Patient</h1>
                    <NavLink to={"/patients"} className={"btn btn-primary"}>Go Back</NavLink>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" id="name" className="form-control border-black" />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" name="age" id="age" className="form-control border-black" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <select className="form-select border-black">
                            <option value="">Select Patient's gender</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="mobileno" className="form-label">Mobile Number</label>
                        <input type="number" name="mobileno" id="mobileno" className="form-control border-black" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <textarea name="address" id="address" rows={3} className="form-control border-black" placeholder="Enter full address"></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label className="form-label">Blood Group</label>
                        <select className="form-select border-black">
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="height" className="form-label">Height (cm)</label>
                        <input type="number" name="height" id="height" className="form-control border-black" placeholder="Enter height in cm" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="smoking" className="form-label">Smoking</label>
                        <select name="smoking" id="smoking" className="form-select border-black">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="alcohol" className="form-label">Alcohol</label>
                        <select name="alcohol" id="alcohol" className="form-select border-black">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="tobacco" className="form-label">Tobacco</label>
                        <select name="tobacco" id="tobacco" className="form-select border-black">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <button className="btn btn-success px-4">
                        Save Patient
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddPatient