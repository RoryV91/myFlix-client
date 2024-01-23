import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick }) => {
	return (
		<Card
			className="movie-card"
			onClick={() => onMovieClick(movie)}
		>
			<Card.imageurl src={movie.imageurl} />
			<Card.Body>
				<Card.Title>{movie.title}</Card.Title>
				<Card.Text>{movie.description}</Card.Text>
			</Card.Body>
		</Card>
	);
};

MovieCard.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		imageurl: PropTypes.string,
		featured: PropTypes.bool,
		actor_ids: PropTypes.arrayOf(PropTypes.string),
		release: PropTypes.string,
		director_ids: PropTypes.arrayOf(PropTypes.string),
		genre_ids: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
