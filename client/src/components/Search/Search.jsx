import React from 'react';
import styles from './Search.module.scss';

const Search = ({ onChange, placeholder }) => {
    return (
        <input
            type="text"
            className={styles.input}
            onChange={(event) => onChange(event)}
            placeholder={placeholder}
        />
    )
}

export default Search;