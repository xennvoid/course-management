import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Course.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const Course = ({ courseName, courseId, courseUid }) => {

    return (

        <li className={styles.item}>
            <div className={styles.card}>
                <Link to={`/course/${courseUid}`}>
                    <p>{courseName}</p>
                </Link>
            </div>
        </li>
    )
}

export default Course