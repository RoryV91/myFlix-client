import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const EditDirectorView = ({
	directors,
	token,
	updateDirector,
	deleteDirector,
}) => {
	const { id } = useParams();
	const [director, setDirector] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	useEffect(() => {
		if (directors) {
			const foundDirector = directors.find((director) => director._id === id);
			if (foundDirector) {
				setValue("name", foundDirector.name);
				setValue("bio", foundDirector.bio);
				setValue("imageurl", foundDirector.imageurl);
				setDirector(foundDirector);
			}
		}

		setIsLoading(false);
	}, [directors, setValue, id]);

	const onSubmit = (data) => {
		axios
			.put(
				`https://myflixapi.vanblaricom.dev:9999/directors/${director._id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((response) => {
				const updatedDirector = response.data;
				alert("Director updated successfully");
				navigate(`/director/${director._id}`);
				updateDirector(updatedDirector);
			})
			.catch((error) => {
				console.log(error);
				alert("An error occurred while updating the director");
			});
	};

	const onDelete = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this director? This action cannot be undone."
			)
		) {
			axios
				.delete(`https://myflixapi.vanblaricom.dev:9999/directors/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					if (response.status === 200) {
						alert("Director deleted successfully");

						deleteDirector(id);
					} else {
						alert("Failed to delete director");
					}
				})
				.catch((error) => {
					console.error("Error deleting director", error);
					alert("Failed to delete director: " + error.message);
				})
				.finally(() => {
					navigate("/directors/view");
				});
		}
	};

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="progress w-50">
					<div className="indeterminate"></div>
				</div>
			</div>
		);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>🎬 Director Name</Form.Label>
						<Form.Control {...register("name", { required: true })} />
						{errors.name && <p>This field is required</p>}
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>📝 Bio</Form.Label>
						<Form.Control
							as="textarea"
							rows={5}
							{...register("bio", { required: true })}
						/>
						{errors.bio && <p>This field is required</p>}
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>🖼️ Image URL</Form.Label>
						<Form.Control {...register("imageurl")} />
					</Form.Group>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col
					xs={12}
					md={4}
					className="mb-3 mb-md-0 text-center"
				>
					<Button
						variant="danger"
						type="button"
						onClick={onDelete}
						className="w-100"
					>
						Delete Director 🗑️
					</Button>
				</Col>
				<Col
					xs={12}
					md={4}
					className="mb-3 mb-md-0 text-center"
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
					md={4}
					className="text-md-end"
				>
					<Button
						variant="success"
						type="submit"
						className="w-100"
					>
						Save Changes 💾
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

EditDirectorView.propTypes = {
	directors: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			bio: PropTypes.string.isRequired,
			imageurl: PropTypes.string.isRequired,
		})
	).isRequired,
	token: PropTypes.string,
	updateDirector: PropTypes.func.isRequired,
	deleteDirector: PropTypes.func.isRequired,
};

export default EditDirectorView;
