import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import useFetchMovies from "../../hooks/use-fetch-movies/use-fetch-movies";

const DirectorView = ({ token }) => {
	const { id } = useParams();
	const [selectedDirector, setSelectedDirector] = useState(null);
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
					<Button
						className="m-3"
						variant="danger"
					>
						Delete ✂️
					</Button>
					<Button
						className="m-3"
						variant="warning"
					>
						Edit 📝
					</Button>
					<Button
						className="m-3"
						variant="info"
						onClick={() => navigate(-1)}
					>
						Back ⏮️
					</Button>
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
	token: PropTypes.string.isRequired,
};

export default DirectorView;
