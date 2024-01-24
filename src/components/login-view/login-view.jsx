import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import Header from '../header/header';

const LoginView = ({ onLoggedIn }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        fetch('https://myflixapi.vanblaricom.dev:9999/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    onLoggedIn(data.user, data.token);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Login failed. Please check your credentials and try again.');
            });
    };

    return (
        <div className="login-view">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('username', { required: true })}
                    />
                    {errors.username && <p>Username is required</p>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <p>Password is required</p>}
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    token: PropTypes.string,
};

export default LoginView;