import React, { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: 'http://localhost:5000/api/users/login',
            headers: { apiKey: 'apikeyZ7kl99bBRqbEcJHG342342IYTUMGHFGGDFDGVBXSEFgdf' },
            data: { email, password }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            if (response.data.result === 'success') {
                localStorage.setItem('myToken', response.data.authtoken)
                toast.success('You are logged in')
                setEmail('')
                setPassword('')
                setTimeout(() => {
                    navigate('/view-students')
                }, 2000);
            }
            else {
                toast.error('invalid details')
            }
        }).catch(function (error) {
            console.error(error);
            toast.error('invalid details')
        });
    }
    return (
        <div className="container">
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
            <form method='post' onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login