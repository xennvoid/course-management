import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyTitle from '../../components/UI/MyTitle/MyTitle';
import { getAllCourses } from '../../store/slices/coursesSlice';
import Course from './Course/Course';
import styles from './Courses.module.scss';

const Courses = () => {

    const dispatch = useDispatch();
    const { courses } = useSelector(state => state.courses);

    useEffect(() => {
        dispatch(getAllCourses());
    }, []);

    return (
        <div className={styles.courses}>
            <MyTitle>Courses control panel</MyTitle>
            <ul className={styles.list}>
                {
                    courses.map(course => <Course key={course.uid} courseName={course.course_name} courseId={course.course_id} courseUid={course.uid} />)
                }
            </ul>
        </div>
    )
}

export default Courses;