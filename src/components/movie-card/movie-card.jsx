import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MovieCard = ({ movie, darkMode, user, token, updateUserFavorites }) => {
	console.log()
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(user.user_movie_ids.includes(movie._id));
    }, [user.user_movie_ids, movie._id]);

const handleToggleFavorite = async (event) => {
	event.stopPropagation();

	const isFavorite = user.user_movie_ids.includes(movie._id);
	const method = isFavorite ? "PUT" : "POST";
	const apiEndpoint = isFavorite
		? `https://myflixapi.vanblaricom.dev:9999/users/${user._id}/favorites/remove`
		: `https://myflixapi.vanblaricom.dev:9999/users/${user._id}/favorites/add`;

	const response = await fetch(apiEndpoint, {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ movieId: String(movie._id) }),
	});

	if (!response.ok) {
		console.error("Failed to update favorites");
	} else {
		// The server request succeeded, so update the favorite status in the UI
		setIsFavorite(!isFavorite);

		// And update the user's favorite movies in the parent component's state
		let updatedFavorites;
		if (isFavorite) {
			updatedFavorites = user.user_movie_ids.filter((id) => id !== movie._id);
		} else {
			updatedFavorites = [...user.user_movie_ids, movie._id];
		}
		updateUserFavorites(updatedFavorites);
	}
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
