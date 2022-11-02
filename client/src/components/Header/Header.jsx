import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {

    const navigate = useNavigate();

    return (
        <h1 className={styles.title} onClick={() => navigate('/')}>
            Courses Management System
        </h1>
    )
}

export default Header