import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import useFetchMovies from "../../hooks/use-fetch-movies/use-fetch-movies";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const ActorView = ({ token }) => {
	useScrollToTop();
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

	const handleDelete = () => {
		// code to handle delete action
	};

	const handleEdit = () => {
		// code to handle edit action
	};

	//Handle Back
	const handleBack = () => {
		navigate(-1);
	};

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
	selectedActor: PropTypes.shape({
		name: PropTypes.string.isRequired,
		bio: PropTypes.string.isRequired,
		imageurl: PropTypes.string,
		birth: PropTypes.string,
		movie_ids: PropTypes.arrayOf(PropTypes.string),
	}),
	token: PropTypes.string,
	darkMode: PropTypes.bool.isRequired,
};

export default ActorView;
