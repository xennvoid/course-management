import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    students: [],
    currentStudent: null,
    error: null,
    loading: false,
}

export const getAllStudents = createAsyncThunk(
    'students/getAll',
    async (_, thunkAPI) => {
        try {

            const response = await axios.get(`http://localhost:5000/api/students`);

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })

export const addNewStudent = createAsyncThunk(
    'students/create',
    async (studentData, thunkAPI) => {
        try {

            const response = await axios({
                method: "POST",
                url: "http://localhost:5000/api/students/create",
                headers: {
                    "Content-Type": 'application/json',
                },
                data: { ...studentData },

            });

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })

export const getStudentByUid = createAsyncThunk(
    'students/getStudentByUid',
    async (studentUid, thunkAPI) => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:5000/api/students/${studentUid}`,
                headers: {
                    "Content-Type": 'application/json',
                },
            });

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data[0];

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async (studentData, thunkAPI) => {
        try {

            const body = JSON.stringify(studentData);

            const response = await axios({
                method: "PUT",
                url: `http://localhost:5000/api/students`,
                headers: {
                    "Content-Type": 'application/json',
                },
                data: body,
            });

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })

export const deleteStudentByUid = createAsyncThunk(
    'students/deleteStudentByUid',
    async (studentUid, thunkAPI) => {
        try {
            const response = await axios({
                method: "DELETE",
                url: `http://localhost:5000/api/students/${studentUid}`,
                headers: {
                    "Content-Type": 'application/json',
                },
            });

            if (response.status !== 200)
                throw thunkAPI.rejectWithValue(response.status)

            return await response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue("REQUEST DATA ERROR")
        }
    })


const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        deleteStoreStudent: (state, action) => {
            state.students = state.students.filter(student => student.uid !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(getAllStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllStudents.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
        builder
            .addCase(getStudentByUid.fulfilled, (state, action) => {
                state.loading = false;
                state.currentStudent = action.payload;
            })
            .addCase(getStudentByUid.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStudentByUid.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
})


export const { deleteStoreStudent } = studentsSlice.actions;
export const studentsReducer = studentsSlice.reducer;
