import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MovieView = ({ selectedMovie, onBackClick }) => {
	const [directors, setDirectors] = useState([]);
	const [actors, setActors] = useState([]);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		Promise.all(
			selectedMovie.director_ids.map((id) =>
				fetch(`/api/directors/${id}`).then((res) => res.json())
			)
		).then(setDirectors);

		Promise.all(
			selectedMovie.actor_ids.map((id) =>
				fetch(`/api/actors/${id}`).then((res) => res.json())
			)
		).then(setActors);

		Promise.all(
			selectedMovie.genre_ids.map((id) =>
				fetch(`/api/genres/${id}`).then((res) => res.json())
			)
		).then(setGenres);
	}, [selectedMovie]);
	return (
		<div>
			<div>
				<img src={selectedMovie.imageurl} />
			</div>
			<div>
				<span>Title: </span>
				<span>{selectedMovie.title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{selectedMovie.description}</span>
			</div>
			<div>
				<span>Release: </span>
				<span>{new Date(selectedMovie.release).toLocaleDateString()}</span>
			</div>
			<div>
				<span>Featured: </span>
				<span>{selectedMovie.featured.toString()}</span>
			</div>
			<button onClick={onBackClick}>Back</button>
		</div>
	);
};

MovieView.propTypes = {
	selectedMovie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		imageurl: PropTypes.string,
		featured: PropTypes.bool,
		actor_ids: PropTypes.arrayOf(PropTypes.string),
		release: PropTypes.string,
		director_ids: PropTypes.arrayOf(PropTypes.string),
		genre_ids: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
