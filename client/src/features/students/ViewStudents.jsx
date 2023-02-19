import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllStudents, getStudentStatus, getStudentError, fetchStudents } from './studentSlice'

const ViewStudents = () => {

  const dispatch = useDispatch()
  const students = useSelector(selectAllStudents)
  const studentStatus = useSelector(getStudentStatus)
  const error = useSelector(getStudentError)

  useEffect(() => {
    console.log(students)
    if (studentStatus === 'idle') {
      dispatch(fetchStudents())
    }
  }, [studentStatus, dispatch])

  let content;
  if (studentStatus === 'loading') {
    content = <p>"Loading..."</p>
  }
  else if (studentStatus === 'succeeded') {
    content = students.users.map((student, no) => {
      return <tr key={student._id}>
        <th scope="row">{no + 1}</th>
        <td><img src={`http://localhost:5000/api/images/${student.photos}`} className='img-thumbnail' width={75} /></td>
        <td>{student.firstName}</td>
        <td>{student.lastName}</td>
        <td>{student.fatherName}</td>
        <td>{student.email}</td>
        <td>{student.address}</td>
        <td>{student.mobile}</td>
        <td>{student.gender}</td>
        <td>{student.DOB}</td>
        <td>{student.country}</td>
      </tr>
    })
  }
  else if (studentStatus === 'failed') {
    content = <p>{error}</p>
  }


  return (
    <div className="container mt-4">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Sr.No.</th>
            <th scope="col">image</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Father Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Mobile</th>
            <th scope="col">Gender</th>
            <th scope="col">DOB</th>
            <th scope="col">Country</th>
          </tr>
        </thead>

        <tbody>
          {content}
        </tbody>

      </table>
    </div>
  )
}

export default ViewStudents