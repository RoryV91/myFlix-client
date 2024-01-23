import React, { useState } from "react";

const SignupView = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [dob, setDob] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			username: username,
			password: password,
			email: email,
			dob: dob,
		};

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
		<form onSubmit={handleSubmit}>
			<label>
				Username:
				<div className="input-container">
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						minLength="5"
						maxLength="20"
						required
					/>
					<small>
						5 &lt;{" "}
						<span
							className={
								username.length >= 5 && username.length <= 20 ? "green" : "red"
							}
						>
							{username.length}
						</span>{" "}
						&gt; 20
					</small>
					{username.length >= 5 && username.length <= 20 && (
						<span
							role="img"
							aria-label="thumbs up"
						>
							👍
						</span>
					)}
				</div>
			</label>
			<label>
				Password:
				<div className="input-container">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength="8"
						required
					/>
					<small>
						8 &lt;{" "}
						<span
							className={
								password.length >= 8 && password.length <= 32 ? "green" : "red"
							}
						>
							{password.length}
						</span>{" "}
						&gt; 32
					</small>
					{password.length >= 8 && password.length <= 32 && (
						<span
							role="img"
							aria-label="thumbs up"
						>
							👍
						</span>
					)}
				</div>
			</label>
			<label>
				Email:
				<div className="input-container">
					<input
						type="email"
						value={email}
                        required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<small>Valid email with "@" </small>
					{email.includes("@") && (
						<span
							role="img"
							aria-label="thumbs up"
						>
							👍
						</span>
					)}
				</div>
			</label>
			<label>
				Date of birth:
				<div className="input-container">
					<input
						type="date"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						required
					/>
					<small>Don't forget this one!</small>
					{dob && (
						<span
							role="img"
							aria-label="thumbs up"
						>
							👍
						</span>
					)}
				</div>
			</label>
			<button type="submit">Submit</button>
		</form>
	);
};

export default SignupView;
