import React from 'react';
import styles from './CustomButton.module.scss';

const CustomButton = ({ children, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}

export default CustomButton;