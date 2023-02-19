import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    students: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/users/view', {
            headers: {
                apiKey: 'apikeyZ7kl99bBRqbEcJHG342342IYTUMGHFGGDFDGVBXSEFgdf'
            }
        })
        return response.data
    }
    catch (error) {
        return error.message
    }
})

export const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchStudents.pending, (state, action) => {
            state.status = 'loading'
        })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.students = action.payload
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export const selectAllStudents = (state) => state.students.students
export const getStudentStatus = (state) => state.students.status
export const getStudentError = (state) => state.students.error

export const { } = studentSlice.actions
export default studentSlice.reducer