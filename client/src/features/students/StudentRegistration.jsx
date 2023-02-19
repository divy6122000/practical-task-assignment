import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const StudentRegistration = () => {
    const initialVal = { firstName: '', fatherName: '', lastName: '', email: '', password: '', address: '', gender: '', mobile: '', country: '', DOB: '' }
    const [user, setUser] = useState(initialVal)
    const [image, setImage] = useState("")
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const { firstName, fatherName, lastName, email, password, address, gender, mobile, country, DOB } = user;
        const formData = new FormData()
        formData.append('firstName', firstName)
        formData.append('fatherName', fatherName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('address', address)
        formData.append('mobile', mobile)
        formData.append('gender', gender)
        formData.append('DOB', DOB)
        formData.append('country', country)
        formData.append('photo', image, image.name)

        const options = {
            method: 'POST',
            url: 'http://localhost:5000/api/users/create',
            headers: {
                apiKey: 'apikeyZ7kl99bBRqbEcJHG342342IYTUMGHFGGDFDGVBXSEFgdf',
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        };

        // return console.log(formData)
        axios.request(options).then(function (response) {
            if (response.data.result === 'success') {
                setUser(initialVal)
                toast.success(response.data.msg);
            }
            else {
                toast.success(response.data.msg);
            }
        }).catch(function (error) {
            if (error?.response?.status === 400) {
                toast.error(error?.response?.data?.msg);
            }
            else {
                toast.error("Internal ser ver error");
            }
        });
    }
    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // toast.success('');
    return (
        <div className="container mt-4">
            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <form method='post' onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="firstName" className="form-label">FirstName</label>
                        <input type="text" name='firstName' onChange={handleOnChange} value={user.firstName} className="form-control" id="firstName" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="fatherName" className="form-label">Father's Name</label>
                        <input type="text" name='fatherName' onChange={handleOnChange} value={user.fatherName} className="form-control" id="fatherName" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="lastName" className="form-label">LastName</label>
                        <input type="text" name='lastName' onChange={handleOnChange} value={user.lastName} className="form-control" id="lastName" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="inputEmail5" className="form-label">Email Address</label>
                        <input type="email" name='email' onChange={handleOnChange} value={user.email} className="form-control" id="inputEmail5" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="photo" className="form-label">Profile</label>
                        <input type="file" name='photo' onChange={(e) => { setImage(e.target.files[0]) }} className="form-control" id="photo" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword5" className="form-label">Password</label>
                        <input type="password" name='password' onChange={handleOnChange} value={user.password} className="form-control" id="inputPassword5" />
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Address</label>
                            <textarea className="form-control" name='address' onChange={handleOnChange} value={user.address} id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Gender</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" onChange={handleOnChange} value="male" name="gender" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1" checked>
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" onChange={handleOnChange} value="female" name="gender" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputAddress2" className="form-label">Mobile</label>
                        <input type="text" name='mobile' onChange={handleOnChange} value={user.mobile} className="form-control" id="inputAddress2" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputState" className="form-label">country</label>
                        <select id="inputState" className="form-select" name='country' onChange={handleOnChange} >
                            <option value="">Choose...</option>
                            <option value="india">India</option>
                            <option value="usa">Usa</option>
                            <option value="uk">UK</option>
                            <option value="canada">Canada</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="DOB" className="form-label">Date Of Birth</label>
                        <input type="date" name='DOB' onChange={handleOnChange} value={user.DOB} className="form-control" id="DOB" />
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <button type="reset" className="btn btn-secondary">Reset</button>
                </div>
            </form>
        </div>
    )
}

export default StudentRegistration