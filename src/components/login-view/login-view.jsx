import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';

const LoginView = ({ onLoggedIn }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

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
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Login failed. Please check your credentials and try again.');
            });
    };

    return (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-center display-1'>myFlix</h1>
                <br />
                <h3 className='text-center'>Log in to your account below</h3>
                <br />
                <p className='text-center'>Don't have an account? <a href='/signup'>Sign up here</a></p>
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

                <Button variant="secondary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
    );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    token: PropTypes.string,
};

export default LoginView;