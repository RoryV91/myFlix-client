import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";
import axios from "axios";

const ActorView = ({ actors, movies, token, deleteActor }) => {
	useScrollToTop();
	const { id } = useParams();
	const location = useLocation();
	const initialSelectedActor = location.state
		? location.state.selectedActor
		: actors.find((actor) => actor._id === id);
	const [selectedActor, setSelectedActor] = useState(initialSelectedActor);
	const navigate = useNavigate();

	useEffect(() => {
		const updatedSelectedActor = actors.find((actor) => actor._id === id);
		setSelectedActor(updatedSelectedActor);
	}, [actors, id]);

	const thisActorMovies = movies.filter((movie) =>
		movie.actor_ids.includes(selectedActor?._id)
	);
	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this actor? This action cannot be undone.")) {
			console.log(selectedActor._id, token);
			axios
				.delete(
					`https://myflixapi.vanblaricom.dev:9999/actors/${selectedActor._id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((response) => {
					if (response.status === 200) {
						alert("Actor deleted successfully");
						deleteActor(selectedActor._id);
					} else {
						alert("Failed to delete actor");
					}
				})
				.catch((error) => {
					console.error("Error deleting actor", error);
					alert("Failed to delete actor: " + error.message);
				})
				.finally(() => {
					navigate('/actors/view');
				});
		}
	};

	const handleEdit = () => {
		navigate(`/actors/edit/${selectedActor._id}`, {
			state: { selectedActor },
		});
	};

	//Handle Back
	const handleBack = () => {
		navigate(-1);
	};

	if (!selectedActor) return null;

	return (
		<Container className="mt-5">
			<Row>
				<Col
					xs={12}
					md={6}
				>
					<img
						src={selectedActor.imageurl}
						className="img-fluid"
					/>
				</Col>
				<Col
					xs={12}
					md={6}
				>
					<h2 className="mt-3">{selectedActor.name}</h2>
					<p>
						<strong>📓 Biography: </strong>
						{selectedActor.bio}
					</p>
					<p>
						<strong>🍼 Birth: </strong>
						{new Date(selectedActor.birth).toLocaleDateString()}
					</p>
					{selectedActor.death && (
						<p>
							<strong>💀 Death: </strong>
							{new Date(selectedActor.death).toLocaleDateString()}
						</p>
					)}
					<p>
						<strong>🍿 Movies: </strong>
					</p>
					{thisActorMovies.length > 0 ? (
						thisActorMovies.map((movie, index) => (
							<li key={index}>
								<Link to={`/movie/${movie._id}`}>{movie.title}</Link>
							</li>
						))
					) : (
						<p>No movies found for this actor yet.</p>
					)}
					<ActionButtons
						onDelete={handleDelete}
						onEdit={handleEdit}
						onBack={handleBack}
					/>
				</Col>
					
			</Row>
		</Container>
	);
};

ActorView.propTypes = {
	actors: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			bio: PropTypes.string.isRequired,
			birth: PropTypes.string.isRequired,
			death: PropTypes.string,
			imageurl: PropTypes.string.isRequired,
		})
	).isRequired,
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			actor_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
		})
	).isRequired,
	deleteActor: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
};

export default ActorView;
