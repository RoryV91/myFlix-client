import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const EditActorView = ({ actors, token, updateActor, deleteActor }) => {
	const { id } = useParams();
	const [actor, setActor] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	useEffect(() => {
		if (actors) {
			const foundActor = actors.find((actor) => actor._id === id);
			if (foundActor) {
				setValue("name", foundActor.name);
				setValue("bio", foundActor.bio);
				setValue("imageurl", foundActor.imageurl);
				setActor(foundActor);
			}
		}

		setIsLoading(false);
	}, [actors, setValue, id]);

	const onSubmit = (data) => {
		axios
			.put(`https://myflixapi.vanblaricom.dev:9999/actors/${actor._id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				const updatedActor = response.data;
				alert("Actor updated successfully");
				navigate(`/actor/${actor._id}`);
				updateActor(updatedActor);
			})
			.catch((error) => {
				console.log(error);
				alert("An error occurred while updating the actor");
			});
	};

	const onDelete = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this actor? This action cannot be undone."
			)
		) {
			axios
				.delete(`https://myflixapi.vanblaricom.dev:9999/actors/${id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					if (response.status === 200) {
						alert("Actor deleted successfully");

						deleteActor(id);
					} else {
						alert("Failed to delete actor");
					}
				})
				.catch((error) => {
					console.error("Error deleting actor", error);
					alert("Failed to delete actor: " + error.message);
				})
				.finally(() => {
					navigate("/actors/view");
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
						<Form.Label>🎬 Actor Name</Form.Label>
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
						Delete Actor 🗑️
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

EditActorView.propTypes = {
	actors: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			bio: PropTypes.string.isRequired,
			imageurl: PropTypes.string.isRequired,
		})
	).isRequired,
	token: PropTypes.string,
	updateActor: PropTypes.func.isRequired,
	deleteActor: PropTypes.func.isRequired,
};

export default EditActorView;
