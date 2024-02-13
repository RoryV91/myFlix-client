import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const DirectorView = ({ directors, movies }) => {
	useScrollToTop();
	const { id } = useParams();
	const location = useLocation();
	const initialSelectedDirector = location.state
		? location.state.selectedDirector
		: directors.find((director) => director._id === id);
	const [selectedDirector, setSelectedDirector] = useState(initialSelectedDirector);
	const navigate = useNavigate();

	useEffect(() => {
		const updatedSelectedDirector = directors.find((director) => director._id === id);
		setSelectedDirector(updatedSelectedDirector);
	}, [directors, id]);

	const thisDirectorMovies = movies.filter((movie) =>
		movie.director_ids.includes(selectedDirector?._id)
	);

	const handleDelete = () => {
		// code to handle delete action
	};

	const handleEdit = () => {
		navigate(`/directors/edit/${selectedDirector._id}`, {
			state: { selectedDirector },
		});
	};

	//Handle Back
	const handleBack = () => {
		navigate(-1);
	};

	if (!selectedDirector) return null;

	return (
		<Container className="mt-5">
			<Row>
				<Col xs={12} md={6}>
					<img
						src={selectedDirector.imageurl}
						className="img-fluid"
					/>
				</Col>
				<Col xs={12} md={6}>
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

export default DirectorView;