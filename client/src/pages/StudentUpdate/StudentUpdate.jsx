import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getStudentByUid, updateStudent } from '../../store/slices/studentsSlice';
import styles from './StudentUpdate.module.scss';


import Form from '../../components/UI/Form/Form';
import Select from 'react-select';
import { getAllCourses } from '../../store/slices/coursesSlice';
import { toast } from 'react-toastify';
import MyTitle from '../../components/UI/MyTitle/MyTitle';

const initialState = {
    studentName: "",
    studentAge: 17,
    studentCourses: "",
};

const StudentUpdate = () => {

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const { currentStudent, loading } = useSelector(state => state.students);
    const { courses } = useSelector(state => state.courses);

    const studentUid = pathname.split('/')[pathname.split('/').length - 1];

    const [formData, setFormData] = useState(initialState);
    const studentSelectedCourses = currentStudent?.student_course?.split(",").map(course => {
        if (course !== "") return ({ value: course.toLowerCase(), label: course });
        return;
    });

    const notSelectedCourses = courses.map(course => ({ value: course.course_name.toLowerCase(), label: course.course_name }));

    const inputs = [
        {
            id: 1,
            name: "studentName",
            label: "Student Name",
            type: "text",
            pattern: /^[a-zA-Z0-9\s\_]*$/,
            required: true
        },
        {
            id: 2,
            name: "studentAge",
            label: "Age",
            type: "number",
            min: "15",
            max: "45",
            required: true
        },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateStudent({
            name: formData.studentName,
            age: formData.studentAge,
            courses: formData.studentCourses,
            className: "545",
            uid: currentStudent.uid,
        }));
        toast.success("Information about this student was updated!", { autoClose: 2000, pauseOnHover: false, hideProgressBar: true });
    }

    const handleSelect = (selectedOptions) => {
        let courses = Array.from(selectedOptions, option => option.value);
        setFormData({ ...formData, studentCourses: courses });
    }

    useEffect(() => {
        dispatch(getStudentByUid(studentUid));
    }, []);

    useEffect(() => {
        dispatch(getAllCourses());
    }, []);

    useEffect(() => {
        currentStudent && setFormData({
            studentName: currentStudent.student_name,
            studentAge: currentStudent.student_age,
            studentCourses: currentStudent.student_course,
        });
    }, [currentStudent]);

    return (
        !loading &&
        <>
            <MyTitle>
                Update student info
            </MyTitle>
            <Form formData={formData} setFormData={setFormData} onSubmit={(e) => handleSubmit(e)} inputs={inputs} submitText={"Update student info"}>
                <label htmlFor="courses" className={styles.label}>Courses</label>
                <Select
                    isMulti
                    name="courses"
                    options={notSelectedCourses}
                    className={styles.select}
                    classNamePrefix="select"
                    onChange={handleSelect}
                    defaultValue={studentSelectedCourses}
                />
            </Form>
        </>
    )
}

export default StudentUpdate;

