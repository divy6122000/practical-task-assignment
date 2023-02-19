import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('myToken');
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">User Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to={'/view-students'}>View Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={'/student-registration'}>Student Registration</Link>
                        </li>
                    </ul>
                    {(localStorage.getItem('myToken')) ? <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button> : ''}
                </div>
            </div>
        </nav>
    )
}

export default Header