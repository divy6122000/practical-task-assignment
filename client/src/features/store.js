import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./students/studentSlice";

const store = configureStore({
    reducer: {
        students: studentReducer
    }
})

export default store