import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import MyTitle from '../../components/UI/MyTitle/MyTitle';
import { deleteCourseByID, deleteStoreCourse, getCourseByID } from '../../store/slices/coursesSlice';
import styles from './CurrentCourse.module.scss';
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im';
import axios from 'axios';

const CurrentCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { currentCourse, loading } = useSelector(state => state.courses);
    const [courseStudents, setCourseStudents] = useState(null);
    const [studentGrades, setStudentGrades] = useState(null);

    useEffect(() => {
        dispatch(getCourseByID(id));

        const getSubscribedStudents = async () => {
            const response = await axios.get(`http://localhost:5000/api/courses/${id}/students`);
            const res = await response.data;
            setCourseStudents(res);
        }

        getSubscribedStudents();

    }, [dispatch]);

    const deleteCourse = () => {
        dispatch(deleteStoreCourse(currentCourse.course_id));
        dispatch(deleteCourseByID(id));
        navigate(-1, { replace: true });
        toast.success(`${currentCourse.course_name.toUpperCase()} course was successfully deleted!`, { autoClose: 3000, pauseOnHover: false });
    }

    const removeStudentFromCourse = async (studentID) => {

        await axios({
            method: "DELETE",
            url: `http://localhost:5000/api/courses/delete/student/${studentID}`,
            headers: {
                "Content-Type": 'application/json',
            },
            data: { id }
        });

        setCourseStudents(courseStudents => courseStudents.filter(student => student.student_id !== studentID));
    }

    useEffect(() => {

        const getSubscribedStudentsGrades = async () => {
            const response = await axios.get(`http://localhost:5000/api/courses/${id}/grades`);
            const res = await response.data;
            setStudentGrades(res);
        }

        getSubscribedStudentsGrades();

    }, [courseStudents])

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
                                {courseStudents?.map((student, i) =>
                                    <li
                                        key={student.student_id}
                                        className={styles.students_item}
                                    >
                                        <span>{i + 1}.</span>
                                        <NavLink to={`/update/student/${student?.student_id}`} className={styles.link}>
                                            {student?.student_name + " " + student?.student_surname}
                                        </NavLink>
                                        <p>
                                            Group: {student?.student_group}
                                        </p>
                                        <p>
                                            {studentGrades && studentGrades[i]?.grade} points
                                        </p>
                                        <ImCross
                                            color="red"
                                            cursor="pointer"
                                            onClick={() => removeStudentFromCourse(student.student_id)}
                                        />
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
            <NavLink to={`/update/course/${id}`} className={styles.update}>
                Update course
            </NavLink>
        </div>
    )
}

export default CurrentCourse;