import React from 'react';
import styles from './EmptyInfo.module.scss';

const EmptyInfo = ({ children }) => {
    return (
        <div className={styles.empty}>
            {children}
        </div>
    )
}

export default EmptyInfo;