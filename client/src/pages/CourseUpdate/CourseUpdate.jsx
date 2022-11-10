import React, { useEffect, useState } from 'react';
import styles from './CourseUpdate.module.scss';
import { getCourseByID, updateCourse } from '../../store/slices/coursesSlice';
import { getAllStudents } from '../../store/slices/studentsSlice';
import Form from '../../components/UI/Form/Form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const initialState = {
    courseName: ""
};

const CourseUpdate = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const { currentCourse, loading } = useSelector(state => state.courses);
    //const { students } = useSelector(state => state.students);
    //const [courseStudents, setCourseStudents] = useState(null);

    const inputs = [
        {
            id: 1,
            name: "courseName",
            label: "Course Name",
            type: "text",
            pattern: /^[a-zA-Z0-9\s\_]*$/,
            required: true
        },
    ];

    useEffect(() => {
        dispatch(getCourseByID(id));
        //dispatch(getAllStudents());
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateCourse({
            courseName: formData.courseName,
            courseId: currentCourse.course_id
        }));
        toast.success(`${formData.courseName.toUpperCase()} course was added!`, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true });
    }

    useEffect(() => {
        currentCourse && setFormData({
            courseName: currentCourse.course_name,
        });
    }, [currentCourse]);

    return (
        !loading &&
        <Form
            formData={formData}
            setFormData={setFormData}
            onSubmit={(e) => handleSubmit(e)}
            inputs={inputs}
            submitText={"Update course"}
        >
        </Form>
    )
}

export default CourseUpdate;