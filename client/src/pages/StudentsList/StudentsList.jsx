import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyTitle from '../../components/UI/MyTitle/MyTitle';
import { getAllStudents } from '../../store/slices/studentsSlice';
import StudentCard from './StudentCard/StudentCard';
import styles from './StudentsList.module.scss';

const StudentsList = () => {

    const dispatch = useDispatch();
    const { students } = useSelector(state => state.students);

    useEffect(() => {
        dispatch(getAllStudents());
    }, [])

    return (
        <div>
            <MyTitle className={styles.title}>Manage Students</MyTitle>
            <ul className={styles.list}>
                {
                    students.map(student => <StudentCard key={student.uid} student={student} />)
                }
            </ul>
        </div>
    )
}

export default StudentsList;