import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignupView = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Sending fetch request with data: ", data);

        fetch("https://myflixapi.vanblaricom.dev:9999/users/new", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Response data: ", data);
                if (data._id) {
                    alert("Signup successful");
                    window.location.reload();
                } else {
                    alert("Signup failed");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}
        >
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    {...register('username', { required: true, minLength: 5, maxLength: 20 })}
                />
                {errors.username && <p>Username is required and must be between 5 and 20 characters</p>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    {...register('password', { required: true, minLength: 8, maxLength: 32 })}
                />
                {errors.password && <p>Password is required and must be between 8 and 32 characters</p>}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                />
                {errors.email && <p>Email is required and must be a valid email address</p>}
            </Form.Group>

            <Form.Group controlId="formBasicDob">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                    type="date"
                    {...register('dob', { required: true })}
                />
                {errors.dob && <p>Date of birth is required</p>}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
                Submit
            </Button>
        </Form>
    );
};

export default SignupView;