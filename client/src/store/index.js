import { configureStore } from '@reduxjs/toolkit';
import { coursesReducer } from './slices/coursesSlice';
import { studentsReducer } from './slices/studentsSlice';

const store = configureStore({
    reducer: {
        courses: coursesReducer,
        students: studentsReducer,
    }
})

export default store;