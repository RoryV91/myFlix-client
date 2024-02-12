import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import useFetchMovies from "../../hooks/use-fetch-movies/use-fetch-movies";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const DirectorView = ({ token, directors }) => {
	useScrollToTop();
	const { id } = useParams();
	const location = useLocation();
	const initialSelectedDirector = location.state
	? location.state.selectedDirector
	: directors.find((director) => director._id === id);
	const [selectedDirector, setSelectedDirector] = useState(initialSelectedDirector);
	const movies = useFetchMovies(token);
	const directorMovies =
		movies?.filter((movie) => movie.director_ids.includes(id)) || [];
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://myflixapi.vanblaricom.dev:9999/directors/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((director) => setSelectedDirector(director));
	}, [id, token]);

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

	if (!selectedDirector || movies.length === 0) return null;

	return (
		<Container className="mt-5 vh-100">
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
						<strong>Biography: </strong>
						{selectedDirector.bio}
					</p>
					<p>
						<strong>Movies: </strong>
					</p>
					{directorMovies.map((movie, index) => {
						return (
							<li key={index}>
								<Link to={`/movie/${movie._id}`}>{movie.title}</Link>
							</li>
						);
					})}
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
			imageurl: PropTypes.string,
		})
	).isRequired,
	darkMode: PropTypes.bool.isRequired,
	token: PropTypes.string
};

export default DirectorView;
