import React from 'react';
import FormInput from '../FormInput/FormInput';
import styles from './Form.module.scss';

const Form = ({ onSubmit, inputs, formData, setFormData, submitText, children }) => {

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {
                inputs?.map(input =>
                    <FormInput value={formData[input.name]} key={input.id} onChange={onChange} {...input} />
                )
            }
            {children}
            <input type="submit" value={submitText} />
        </form>
    )
}

export default Form;