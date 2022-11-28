import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getStudentByID, updateStudent } from '../../store/slices/studentsSlice';
import styles from './StudentUpdate.module.scss';

import Form from '../../components/UI/Form/Form';
import Select from 'react-select';
import { getAllCourses } from '../../store/slices/coursesSlice';
import { toast } from 'react-toastify';
import MyTitle from '../../components/UI/MyTitle/MyTitle';
import axios from 'axios';
import Grades from '../../components/Grades/Grades';

const initialState = {
    studentName: "",
    studentSurname: "",
    studentMiddleName: "",
    studentEmail: "",
    studentAge: 17,
    studentGroup: "",
    studentCourses: [],
};

const StudentUpdate = () => {

    const { pathname } = useLocation();
    const studentID = pathname.split('/')[pathname.split('/').length - 1];

    const dispatch = useDispatch();

    const { currentStudent, loading } = useSelector(state => state.students);
    const { courses } = useSelector(state => state.courses);

    const [selectedCourses, setSelectedCourses] = useState(null);

    const [formData, setFormData] = useState(initialState);

    const studentSelectedCoursesOptions = selectedCourses?.map(course => {
        if (course.course_name !== "") return ({ value: course.course_name.toLowerCase(), label: course.course_name });
    });

    const allCoursesOptions = courses.map(course => ({ value: course.course_name.toLowerCase(), label: course.course_name }));

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
            name: "studentSurname",
            label: "Student surname",
            type: "text",
            pattern: /^[a-zA-Z0-9\s\_]*$/,
            required: true
        },
        {
            id: 3,
            name: "studentMiddleName",
            label: "Student middle name",
            type: "text",
            pattern: /^[a-zA-Z0-9\s\_]*$/,
        },
        {
            id: 4,
            name: "studentEmail",
            label: "Email",
            type: "email",
            required: true
        },
        {
            id: 5,
            name: "studentAge",
            label: "Age",
            type: "number",
            min: "15",
            max: "45",
            required: true
        },
        {
            id: 6,
            name: "studentGroup",
            label: "Group",
            type: "text",
            required: true
        },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateStudent({
            id: currentStudent.student_id,
            name: formData.studentName,
            surname: formData.studentSurname,
            middleName: formData.studentMiddleName,
            email: formData.studentEmail,
            age: formData.studentAge,
            group: formData.studentGroup,
            courses: selectedCourses,
        }));
        toast.success("Information about this student was updated!", { autoClose: 2000, pauseOnHover: false, hideProgressBar: true });
    }

    const handleSelect = (selectedOptions) => {
        let selectedCoursesLabels = Array.from(selectedOptions, option => option.label);

        let coursesSelected = selectedCoursesLabels.map(selectedCourseLabel => {
            let matchedCourse = courses.find(course => course.course_name === selectedCourseLabel);

            const existingCourse = selectedCourses.find(course => course.course_id === matchedCourse.course_id);

            return existingCourse ? existingCourse : ({ course_name: selectedCourseLabel, course_id: matchedCourse.course_id, course_grade: 0 });
        });

        setSelectedCourses(coursesSelected);
    };

    const getStudentCourses = async () => {
        const response = await axios.get(`http://localhost:5000/api/students/${studentID}/courses`);
        const res = await response.data;
        setSelectedCourses(res);
    }

    useEffect(() => {
        dispatch(getStudentByID(studentID));
        dispatch(getAllCourses());
        getStudentCourses();
    }, []);

    useEffect(() => {
        currentStudent &&
            setFormData({
                studentName: currentStudent?.student_name,
                studentSurname: currentStudent?.student_surname,
                studentMiddleName: currentStudent?.student_middlename,
                studentEmail: currentStudent?.student_email,
                studentAge: currentStudent?.student_age,
                studentGroup: currentStudent?.student_group,
                studentCourses: currentStudent?.student_courses
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
                {
                    selectedCourses === null
                        ? null
                        :
                        <Select
                            isMulti
                            name="courses"
                            options={allCoursesOptions}
                            className={styles.select}
                            classNamePrefix="select"
                            onChange={handleSelect}
                            defaultValue={studentSelectedCoursesOptions}
                        />
                }
                {
                    selectedCourses?.length > 0
                        ? <Grades selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
                        : null
                }
            </Form>
        </>
    )
}

export default StudentUpdate;

