import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NewMovieView = ({ addMovie, token }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newMovie = { title, description, imageurl: imageUrl };

		const response = await fetch(
			"https://myflixapi.vanblaricom.dev:9999/movies/new",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newMovie),
			}
		);

		if (!response.ok) {
			const message = await response.text();
			alert(`Failed to add movie: ${message}`);
			return;
		}

		const addedMovie = await response.json();
		addMovie(addedMovie);
		alert("Movie added successfully!");
		navigate("/movies/view");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<h1>Add a New Movie ➕ 📼</h1>
			<p>📝 Fill out the form below to add a new movie to the database.</p>
			<Row className="mb-3">
				<Col>
					<Form.Group controlId="title">
						<Form.Label>🪧 Title</Form.Label>
						<Form.Control
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col>
					<Form.Group controlId="imageUrl">
						<Form.Label>🖼️ Image URL</Form.Label>
						<Form.Control
							type="text"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col>
					<Form.Group controlId="description">
						<Form.Label>📰 Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>

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

NewMovieView.propTypes = {
	addMovie: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
};

export default NewMovieView;
