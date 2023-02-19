import { Routes, Route, BrowserRouter } from "react-router-dom"
import React from 'react'

import Header from "./components/Header";
import ViewStudents from "./features/students/ViewStudents";
import StudentRegistration from "./features/students/StudentRegistration";

import Login from "./pages/Login";
const routes = () => {
    let token = localStorage.getItem('myToken')
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/view-students" element={<ViewStudents />} ></Route>
                    <Route path='/student-registration' element={<StudentRegistration />} > </Route>
                    <Route path="/login" element={<Login />} >  </Route>
                </Routes>
            </BrowserRouter>

        </>


    )
}

export default routes