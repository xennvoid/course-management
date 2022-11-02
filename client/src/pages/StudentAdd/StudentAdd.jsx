import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import styles from './StudentAdd.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../store/slices/coursesSlice';
import { addNewStudent } from '../../store/slices/studentsSlice';
import Form from '../../components/UI/Form/Form';
import MyTitle from '../../components/UI/MyTitle/MyTitle';


const initialState = {
    studentName: "",
    studentAge: 17,
    studentCourses: [],
};

const StudentAdd = () => {

    const dispatch = useDispatch();

    const { courses } = useSelector(state => state.courses);

    const [formData, setFormData] = useState(initialState);

    const selectInputRef = useRef(null);

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

    const options = courses.map(course => ({ value: course.course_name.toLowerCase(), label: course.course_name }));

    const onClear = () => {
        selectInputRef.current.clearValue();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addNewStudent({
            name: formData.studentName,
            age: formData.studentAge,
            courses: formData.studentCourses,
            className: "545"
        }));
        toast.success(`${formData.studentName.toUpperCase()} student was added!`, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true });
        onClear();
        setFormData(initialState);
    }

    const handleSelect = (selectedOptions) => {
        let courses = Array.from(selectedOptions, option => option.value);
        setFormData({ ...formData, studentCourses: courses });
    }

    useEffect(() => {
        dispatch(getAllCourses());
    }, []);


    return (
        <>
            <MyTitle>Add a new student</MyTitle>
            <Form formData={formData} setFormData={setFormData} onSubmit={(e) => handleSubmit(e)} inputs={inputs} submitText={"Add a new student"}>
                <label htmlFor="courses" className={styles.label}>Courses</label>
                <Select
                    ref={selectInputRef}
                    isMulti
                    name="courses"
                    options={options}
                    className={styles.select}
                    classNamePrefix="select"
                    onChange={handleSelect}
                />
            </Form>
        </>
    )
}

export default StudentAdd