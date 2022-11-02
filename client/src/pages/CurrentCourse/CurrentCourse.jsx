import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import MyTitle from '../../components/UI/MyTitle/MyTitle';
import { deleteCourseByID, deleteStoreCourse, getCourseByUid } from '../../store/slices/coursesSlice';
import { getAllStudents } from '../../store/slices/studentsSlice';
import styles from './CurrentCourse.module.scss';
import { toast } from 'react-toastify';

const CurrentCourse = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const { currentCourse, loading } = useSelector(state => state.courses);
    const { students } = useSelector(state => state.students);
    const [courseStudents, setCourseStudents] = useState(null);

    useEffect(() => {
        dispatch(getCourseByUid(id));
        dispatch(getAllStudents());
    }, []);

    useEffect(() => {
        setCourseStudents(students?.filter(student => {

            const course = student.student_course?.toLowerCase();
            const presentCourse = currentCourse?.course_name?.toLowerCase();

            if (course.includes(presentCourse))
                return student;
            return;

        }));
    }, [students])

    const deleteCourse = () => {
        dispatch(deleteStoreCourse(currentCourse.course_id));
        dispatch(deleteCourseByID(currentCourse.uid));
        toast.success(`${currentCourse.course_name.toUpperCase()} course was successfully deleted!`, { autoClose: 3000, pauseOnHover: false });
    }

    return (
        !loading &&
        <div className={styles.course}>
            <MyTitle>Edit course</MyTitle>
            <ul>
                <li>
                    <strong>Course name: </strong>{currentCourse?.course_name}
                </li>
                {
                    courseStudents?.length > 0
                        ?
                        <li>
                            <strong>Course students:</strong>
                            <ol className={styles.students_list}>
                                {courseStudents?.map(student =>
                                    <li
                                        key={student.uid}
                                        className={styles.students_item}>
                                        {student.student_name}
                                    </li>
                                )}
                            </ol>
                        </li>
                        : <p>No students are signed up for this course</p>
                }
            </ul>
            <button
                className={styles.button}
                onClick={deleteCourse}
            >
                Delete Course
            </button>
            <NavLink to={`/update/course/${id}`} className={styles.link}>
                Update course
            </NavLink>
        </div>
    )
}

export default CurrentCourse;