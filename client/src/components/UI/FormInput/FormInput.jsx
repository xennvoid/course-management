import { useState } from 'react';
import styles from './FormInput.module.scss';

const FormInput = (props) => {

    const [focused, setFocused] = useState(false);
    const { onChange, label, errorMessage, ...inputProps } = props;

    return (
        <div className={styles.form__input}>
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={() => setFocused(true)}
                onFocus={(e) => e.target.name === 'confirm' && setFocused(true)}
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput