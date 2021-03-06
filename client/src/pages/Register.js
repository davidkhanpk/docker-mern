import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/authContext';
import {REGISTER_USER} from '../utils/queries';

function Register(props) {
    const [errors, setErrors] = useState({})
    const context = useContext(AuthContext);
    const { onChange, onSubmit, values} = useForm(registerUser, {   
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data: {register: userData}} ) {
            context.login(userData)
            props.history.push('/')
        },
        onError(err) {
            console.log()
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })
    function registerUser( ) {
        addUser()
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Register</h1>
                <Form.Input label="Username" placeholder="Username.." name="username" value={values.username} onChange={onChange} error={errors.username ? true : false} />
                <Form.Input label="Email" placeholder="Email.." name="email" value={values.email} onChange={onChange} error={errors.email ? true : false} />
                <Form.Input label="Password" placeholder="Password.." name="password" value={values.password} onChange={onChange} error={errors.password ? true : false} />
                <Form.Input label="Confirm Password" placeholder="Confirm Password.." name="confirmPassword" value={values.confirmPassword} onChange={onChange} error={errors.confirmPassword ? true : false} />
                <Button type="submit" primary>Register</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Register;