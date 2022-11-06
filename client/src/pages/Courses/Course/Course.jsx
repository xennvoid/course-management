import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Course.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const Course = ({ courseName, courseId }) => {

    return (

        <li className={styles.item}>
            <div className={styles.card}>
                <Link to={`/course/${courseId}`}>
                    <p>{courseName}</p>
                </Link>
            </div>
        </li>
    )
}

export default Course