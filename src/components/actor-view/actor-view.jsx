import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import useFetchMovies from "../../hooks/use-fetch-movies/use-fetch-movies";

const ActorView = ({ token }) => {
	const { id } = useParams();
	const [selectedActor, setSelectedActor] = useState(null);
	const movies = useFetchMovies(token);
	const actorMovies =
		movies?.filter((movie) => movie.actor_ids.includes(id)) || [];
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://myflixapi.vanblaricom.dev:9999/actors/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((actor) => setSelectedActor(actor));
	}, [id, token]);

	if (!selectedActor || movies.length === 0) return null;

	return (
		<Container className="mt-5 vh-100">
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
					{actorMovies.map((movie, index) => {
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

ActorView.propTypes = {
	selectedActor: PropTypes.shape({
		name: PropTypes.string.isRequired,
		bio: PropTypes.string.isRequired,
		imageurl: PropTypes.string,
		birth: PropTypes.string,
		movie_ids: PropTypes.arrayOf(PropTypes.string),
	}),
	token: PropTypes.string.isRequired,
	darkMode: PropTypes.bool.isRequired,
};

export default ActorView;
