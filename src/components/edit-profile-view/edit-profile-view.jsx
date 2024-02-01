import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function EditProfileView({ user, token, updateUser }) {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
		watch,
	} = useForm();
	const navigate = useNavigate();
	const password = watch("password", "");

	useEffect(() => {
		setValue("username", user.username);
		setValue("email", user.email);
		setValue("dob", new Date(user.dob));
	}, [setValue, user]);

	const handleUpdate = (data) => {
		const updateData = {
			username: data.username,
			email: data.email,
			dob: data.dob,
		};

		if (data.password && data.password !== "") {
			updateData.password = data.password;
		}

		axios
			.put(
				`https://myflixapi.vanblaricom.dev:9999/users/${user._id}`,
				updateData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
				alert("Profile updated successfully");
				navigate(`/profile/view/${user._id}`);

				// Convert the date of birth to a JavaScript Date object
				const updatedUser = {
					...response.data,
					dob: new Date(response.data.dob),
				};

				// Update the user state in the parent component
				updateUser(updatedUser);
			})
			.catch((e) => {
				console.log(e);
				alert("An error occurred while updating the profile");
			});
	};

	return (
		<Form onSubmit={handleSubmit(handleUpdate)}>
			<Row>
				<Col md={6}>
					<Form.Group
						controlId="formUsername"
						className="mb-3"
					>
						<Form.Label>👤 Username</Form.Label>
						<Form.Control
							{...register("username", {
								required: true,
								minLength: 5,
								maxLength: 20,
							})}
							type="text"
						/>
						{errors.username && (
							<p>
								Username is required and must be between 5 and 20 characters
							</p>
						)}
					</Form.Group>

					<Form.Group
						controlId="formEmail"
						className="mb-3"
					>
						<Form.Label>📧 Email</Form.Label>
						<Form.Control
							{...register("email", {
								required: true,
								pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							})}
							type="email"
						/>
						{errors.email && (
							<p>Email is required and must be a valid email address</p>
						)}
					</Form.Group>

					<Form.Group
						controlId="formPassword"
						className="mb-3"
					>
						<Form.Label>🔒 Password</Form.Label>
						<Form.Control
							{...register("password", { minLength: 8, maxLength: 32 })}
							type="password"
						/>
						{errors.password && (
							<p>Password must be between 8 and 32 characters</p>
						)}
					</Form.Group>

					<Form.Group
						controlId="formPasswordConfirm"
						className="mb-3"
					>
						<Form.Label>🔒 Confirm Password</Form.Label>
						<Form.Control
							{...register("passwordConfirm", {
								validate: (value) =>
									value === password || "The passwords do not match",
							})}
							type="password"
						/>
						{errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
					</Form.Group>

					<Form.Group
						controlId="formDob"
						className="mb-3"
					>
						<Form.Label>📅 Date of Birth</Form.Label>
						<Controller
							control={control}
							name="dob"
							rules={{ required: true }}
							render={({ field }) => (
								<DatePicker
									selected={field.value}
									onChange={(date) => field.onChange(date)}
									className="form-control"
								/>
							)}
						/>
						{errors.dob && <p>Date of birth is required</p>}
					</Form.Group>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col
					xs={12}
					md={6}
					className="mb-3 mb-md-0 text-center"
				>
					<Button
						variant="info"
						type="button"
						className="w-100"
						onClick={() => navigate(-1)}
					>
						Back ⏮️
					</Button>
				</Col>
				<Col
					xs={12}
					md={6}
					className="text-md-end"
				>
					<Button
						variant="success"
						type="submit"
						className="w-100"
					>
						Update Profile 💾
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default EditProfileView;
