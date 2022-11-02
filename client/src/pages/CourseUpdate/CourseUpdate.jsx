import React, { useEffect, useState } from 'react';
import styles from './CourseUpdate.module.scss';
import Form from '../../components/UI/Form/Form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
    studentName: "",
    studentAge: 17,
    studentCourses: [],
};

const CourseUpdate = () => {

    const [formData, setFormData] = useState(initialState);

    //const dispatch = useDispatch();
    const { currentCourse, loading } = useSelector(state => state.courses);
    const { students } = useSelector(state => state.students);
    const [courseStudents, setCourseStudents] = useState(null);

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

    /*useEffect(() => {
        dispatch(getCourseByUid(id));
        dispatch(getAllStudents());
    }, []);*/



    const handleSubmit = (event) => {
        event.preventDefault();
        /*dispatch(addNewStudent({
            name: formData.studentName,
            age: formData.studentAge,
            courses: formData.studentCourses,
            className: "545"
        }));*/
        toast.success(`${formData.courseName.toUpperCase()} course was added!`, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true });
    }

    useEffect(() => {
        currentCourse && setFormData({
            courseName: currentCourse.course_name,
        });
    }, [currentCourse]);

    return (
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