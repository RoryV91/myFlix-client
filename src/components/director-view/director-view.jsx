import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";
import axios from "axios";

const DirectorView = ({ directors, movies, deleteDirector, token }) => {
	useScrollToTop();
	const { id } = useParams();
	const location = useLocation();
	const initialSelectedDirector = location.state
		? location.state.selectedDirector
		: directors.find((director) => director._id === id);
	const [selectedDirector, setSelectedDirector] = useState(
		initialSelectedDirector
	);
	const navigate = useNavigate();

	useEffect(() => {
		const updatedSelectedDirector = directors.find(
			(director) => director._id === id
		);
		setSelectedDirector(updatedSelectedDirector);
	}, [directors, id]);

	const thisDirectorMovies = movies.filter((movie) =>
		movie.director_ids.includes(selectedDirector?._id)
	);

	const handleDelete = () => {
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

	const handleEdit = () => {
		navigate(`/directors/edit/${selectedDirector._id}`, {
			state: { selectedDirector },
		});
	};

	const handleBack = () => {
		navigate(-1);
	};

	if (!selectedDirector) return null;

	return (
		<Container className="mt-5">
			<Row>
				<Col
					xs={12}
					md={6}
				>
					<img
						src={selectedDirector.imageurl}
						className="img-fluid"
					/>
				</Col>
				<Col
					xs={12}
					md={6}
				>
					<h2 className="mt-3">{selectedDirector.name}</h2>
					<p>
						<strong>📓 Biography: </strong>
						{selectedDirector.bio}
					</p>
					<p>
						<strong>🍼 Birth: </strong>
						{new Date(selectedDirector.birth).toLocaleDateString()}
					</p>
					{selectedDirector.death && (
						<p>
							<strong>💀 Death: </strong>
							{new Date(selectedDirector.death).toLocaleDateString()}
						</p>
					)}
					<p>
						<strong>🍿 Movies: </strong>
					</p>
					{thisDirectorMovies.length > 0 ? (
						thisDirectorMovies.map((movie, index) => (
							<li key={index}>
								<Link to={`/movie/${movie._id}`}>{movie.title}</Link>
							</li>
						))
					) : (
						<p>No movies found for this director yet.</p>
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

DirectorView.propTypes = {
	directors: PropTypes.arrayOf(
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
			director_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
		})
	).isRequired,
	deleteDirector: PropTypes.func.isRequired,
	token: PropTypes.string
};

export default DirectorView;
