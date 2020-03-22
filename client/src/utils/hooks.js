import { useState } from 'react';
export const useForm = (callback, initailState = { }) => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }
    const onSubmit = event => {
        event.preventDefault();
        callback();
    }
    return {
        onChange,
        onSubmit,
        values
    }
}