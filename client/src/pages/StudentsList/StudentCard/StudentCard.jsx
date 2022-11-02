import React from 'react';
import styles from './StudentCard.module.scss';
import { MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteStoreStudent, deleteStudentByUid } from '../../../store/slices/studentsSlice';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student }) => {

    const dispatch = useDispatch();

    const { student_name, student_age, student_course, uid } = student;

    const navigate = useNavigate();

    const removeStudent = () => {
        dispatch(deleteStoreStudent(uid));
        dispatch(deleteStudentByUid(uid));
    }

    return (
        <li className={styles.card}>
            <span className={styles.name} onClick={() => navigate(`/update/student/${uid}`)}>
                <span>Name: </span>
                <span className={styles.value}>{student_name}</span>
            </span>
            <span className={styles.age}>
                <span>Age: </span>
                <span className={styles.value}>{student_age}</span>
            </span>
            <span className={styles.courses}>
                <span>Courses: </span>
                <span className={styles.value}>{student_course.length ? student_course : "No courses"}</span>
            </span>
            <MdRemove
                size={30}
                cursor="pointer"
                onClick={removeStudent}
                color={"#000"}
            />
        </li>
    )
}

export default StudentCard;