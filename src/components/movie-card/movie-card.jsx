import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MovieCard = ({ movie, darkMode, user }) => {
	console.log("movie._id:", movie._id);
	console.log("user._id:", user._id);
	console.log("user.user_movie_ids:", user.user_movie_ids);
	const navigate = useNavigate();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setIsFavorite(user.user_movie_ids.includes(movie._id));
	}, [user.user_movie_ids, movie._id]);

	const handleToggleFavorite = (event) => {
		event.stopPropagation();
		setIsFavorite(!isFavorite);
	};

	return (
		<Card
			className={`card ${
				darkMode ? "bg-dark text-light" : "bg-light text-dark"
			} movie-card m-1 p-2 border border-3 no-break`}
		>
			<Button variant="link" className="favorite" onClick={handleToggleFavorite}>
					{isFavorite ? (
						<i className={`bi bi-bookmark-heart-fill ${darkMode ? 'text-light' : 'text-dark'}`} />
					) : (
						<i className={`bi bi-bookmark-heart ${darkMode ? 'text-light' : 'text-dark'}`} />
					)}
				</Button>
			<Link to={`/movie/${movie._id}`}>
				<Card.Img
					src={movie.imageurl}
					className="img-fluid"
					style={{ height: "300px", objectFit: "contain" }}
				/>
			</Link>
			<Card.Body>
				<Card.Title>
					{movie.title.substring(0, 20)}
					{movie.title.length > 20 ? "..." : ""}
				</Card.Title>
				
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
	darkMode: PropTypes.bool.isRequired,
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		user_movie_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
};

export default MovieCard;
