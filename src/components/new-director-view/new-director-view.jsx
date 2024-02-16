import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewDirectorView = ({ addDirector, token }) => {
	const { handleSubmit, control } = useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const newDirector = { ...data, imageurl: data.imageUrl };

		const response = await fetch(
			"https://myflixapi.vanblaricom.dev:9999/directors/new",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newDirector),
			}
		);

		if (!response.ok) {
			const message = await response.text();
			alert(`Failed to add director: ${message}`);
			return;
		}

		const addedDirector = await response.json();
		addDirector(addedDirector);
		alert("Director added successfully!");
		navigate("/directors/view");
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<h1>Add a New Director ➕ 🎬</h1>
			<p>📝 Fill out the form below to add a new director to the database.</p>

			<Form.Group className="mb-3">
				<Form.Label>🪪 Name</Form.Label>
				<Controller
					name="name"
					control={control}
					defaultValue=""
					render={({ field }) => <Form.Control {...field} />}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>🔗 Image URL</Form.Label>
				<Controller
					name="imageUrl"
					control={control}
					defaultValue=""
					render={({ field }) => <Form.Control {...field} />}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Row className="mb-3">
					<Col sm={3}>
						<Form.Label>🍼 Birth</Form.Label>
					</Col>
					<Col sm={10}>
						<Controller
							name="birth"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<DatePicker
									selected={field.value && new Date(field.value)}
									onChange={(date) => field.onChange(date.toISOString())}
									dateFormat="yyyy-MM-dd"
									className="form-control"
								/>
							)}
						/>
					</Col>
				</Row>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>📓 Bio</Form.Label>
				<Controller
					name="bio"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<Form.Control
							as="textarea"
							rows={3}
							{...field}
						/>
					)}
				/>
			</Form.Group>

			<Row className="mb-3">
				<Col
					xs={12}
					sm={6}
					className="mb-2 mb-sm-0"
				>
					<Button
						variant="info"
						type="button"
						onClick={() => navigate(-1)}
						className="w-100"
					>
						Back ⏮️
					</Button>
				</Col>
				<Col
					xs={12}
					sm={6}
				>
					<Button
						variant="success"
						type="submit"
						className="w-100"
					>
						Add ➕
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default NewDirectorView;
