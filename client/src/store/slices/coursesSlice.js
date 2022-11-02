import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    courses: [],
    currentCourse: null,
    error: null,
    loading: false,
}

export const getAllCourses = createAsyncThunk(
    'courses/getAll',
    async (_, thunkAPI) => {
        try {

            const response = await axios.get(`http://localhost:5000/api/courses`);

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })

export const getCourseByUid = createAsyncThunk(
    'courses/getCourseByUid',
    async (uid, thunkAPI) => {
        try {

            const response = await axios.get(`http://localhost:5000/api/courses/${uid}`);

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data[0];

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })

export const createCourse = createAsyncThunk(
    'courses/create',
    async (courseName, thunkAPI) => {
        try {

            const response = await axios({
                method: "POST",
                url: "http://localhost:5000/api/courses/create",
                headers: {
                    "Content-Type": 'application/json',
                },
                data: {
                    courseName
                },

            });

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })

export const deleteCourseByID = createAsyncThunk(
    'courses/deleteCourseByID',
    async (uid, thunkAPI) => {
        try {

            const body = JSON.stringify(uid);

            const response = await axios({
                method: "DELETE",
                url: "http://localhost:5000/api/courses",
                headers: {
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
                data: {
                    uid
                }
            });

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })


const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        deleteStoreCourse: (state, action) => {
            state.courses = state.courses.filter(course => course.uid !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(getAllCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
        builder
            .addCase(getCourseByUid.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCourse = action.payload;
            })
            .addCase(getCourseByUid.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCourseByUid.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})


export const { deleteStoreCourse } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
