import React from 'react';
import styles from './StudentCard.module.scss';
import { MdRemove } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteStoreStudent, deleteStudentFromDB } from '../../../store/slices/studentsSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const StudentCard = ({ student }) => {

    const dispatch = useDispatch();

    const { student_id, student_name, student_surname, student_email } = student;

    const navigate = useNavigate();

    const removeStudent = () => {
        dispatch(deleteStoreStudent(student_id));
        dispatch(deleteStudentFromDB(student_id));
        toast.success(`${student_name} student was deleted!`, { autoClose: 2000, pauseOnHover: false, hideProgressBar: true });
    }

    return (
        <li className={styles.card}>
            <span className={styles.name} onClick={() => navigate(`/update/student/${student_id}`)}>
                <span>Name: </span>
                <span className={styles.value}>{student_name + " " + student_surname}</span>
            </span>
            <span className={styles.age}>
                <span>Email: </span>
                <span className={styles.value}>{student_email}</span>
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