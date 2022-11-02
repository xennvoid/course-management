import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCourse } from '../../store/slices/coursesSlice';
import styles from './CourseCreate.module.scss';

import { toast } from 'react-toastify';
import FormInput from '../../components/UI/FormInput/FormInput';
import MyTitle from '../../components/UI/MyTitle/MyTitle';

const initialState = {
    courseName: "",
};

const CourseCreate = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(initialState);

    const inputs = [
        {
            id: 1,
            name: "courseName",
            label: "Course Name",
            type: "text",
            pattern: /^[A-Za-z0-9\_\-\#]+$/,
            errorMessage: "Course name must be at least 3 characters long",
            required: true
        }
    ]

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createCourse(formData.courseName));
        toast.success(`${formData.courseName.toUpperCase()} course was created!`, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true });
        setFormData(initialState);
    }

    return (
        <div>
            <MyTitle className={styles.title}>
                Create a new course
            </MyTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
                {inputs.map(input =>
                    <FormInput value={formData[input.name]} key={input.id} onChange={onChange} {...input} />
                )}

                <input type="submit" value="Create a new course" />
            </form>
        </div>
    )
}

export default CourseCreate;