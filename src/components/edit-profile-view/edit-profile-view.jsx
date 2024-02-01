import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function EditProfileView({ user }) {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.email);
    const [dob, setDob] = useState(user.dob);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`/users/${user._id}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: dob
        })
        .then(response => {
            console.log(response);
            alert('Profile updated successfully');
        })
        .catch(e => {
            console.log(e);
            alert('An error occurred while updating the profile');
        });
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" value={dob} onChange={e => setDob(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleUpdate}>
                Update Profile
            </Button>
        </Form>
    );
}

export default EditProfileView;