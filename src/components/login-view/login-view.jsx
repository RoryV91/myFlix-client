import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        fetch('https://myflixapi.vanblaricom.dev:9999/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Login failed. Please check your credentials and try again.')
        });
    };

	return (
		<div className="login-view">
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    token: PropTypes.string
  };

export default LoginView;
