import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MovieView = ({ selectedMovie, onBackClick, token }) => {
	const [directors, setDirectors] = useState([]);
	const [actors, setActors] = useState([]);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		Promise.all(
			selectedMovie.director_ids.map((id) =>
				fetch(`https://myflixapi.vanblaricom.dev:9999/directors/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json())
			)
		).then((directors) =>
			setDirectors(directors.map((director) => director.name))
		);

		Promise.all(
			selectedMovie.actor_ids.map((id) =>
				fetch(`https://myflixapi.vanblaricom.dev:9999/actors/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json())
			)
		).then((actors) => setActors(actors.map((actor) => actor.name)));

		Promise.all(
			selectedMovie.genre_ids.map((id) =>
				fetch(`https://myflixapi.vanblaricom.dev:9999/genres/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json())
			)
		).then((genres) => setGenres(genres.map((genre) => genre.name)));
	}, [selectedMovie]);
	useEffect(() => {
		console.log(directors);
	}, [directors]);
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
			<div>
				<span>Director(s): </span>
				<ul>
					{directors.map((director, index) => (
						<li key={index}>{director}</li>
					))}
				</ul>
			</div>
			<div>
				<span>Starring:</span>
				<ul>
					{actors.map((actor, index) => (
						<li key={index}>{actor}</li>
					))}
				</ul>
			</div>
			<div>
				<span>Genres</span>
				<ul>
					{genres.map((genre, index) => (
						<li key={index}>{genre}</li>
					))}
				</ul>
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
	token: PropTypes.string
};

export default MovieView;
