import React from 'react';
import styles from './StudentCard.module.scss';
import { MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteStoreStudent, deleteStudentFromDB } from '../../../store/slices/studentsSlice';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student }) => {

    const dispatch = useDispatch();

    const { student_id, student_name, student_age, student_courses } = student;

    const navigate = useNavigate();

    const removeStudent = () => {
        dispatch(deleteStoreStudent(student_id));
        dispatch(deleteStudentFromDB(student_id));
    }

    return (
        <li className={styles.card}>
            <span className={styles.name} onClick={() => navigate(`/update/student/${student_id}`)}>
                <span>Name: </span>
                <span className={styles.value}>{student_name}</span>
            </span>
            <span className={styles.age}>
                <span>Age: </span>
                <span className={styles.value}>{student_age}</span>
            </span>
            <span className={styles.courses}>
                <span>Courses: </span>
                <span className={styles.value}>{student_courses?.length ? student_courses : "No courses"}</span>
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