import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const MovieCard = ({ movie, onMovieClick, darkMode }) => {
	return (
        <Card
            className={`card ${darkMode ? "bg-dark text-light" : "bg-light text-dark"} movie-card m-5 cursor-pointer border border-3 no-break`}
            onClick={() => onMovieClick(movie)}
        >
            <Card.Img src={movie.imageurl} className="img-fluid" style={{ height: '250px', objectFit: 'contain' }} />
            <Card.Body>
                <Card.Title>{movie.title.substring(0, 25)}{movie.title.length > 25 ? "..." : ""}</Card.Title>
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
    darkMode: PropTypes.bool.isRequired,
};

export default MovieCard;
