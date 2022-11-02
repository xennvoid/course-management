import React from 'react';
import styles from './MyTitle.module.scss';

const MyTitle = ({ children }) => {

    return (
        <h2 className={styles.title}>
            {children}
        </h2>
    )
}

export default MyTitle;