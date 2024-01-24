import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MovieView = ({ selectedMovie, token }) => {
	const [directors, setDirectors] = useState([]);
	const [actors, setActors] = useState([]);
	const [genres, setGenres] = useState([]);
	const navigate = useNavigate();
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
		<div className="container mt-5 vh-100">
			<div className="row">
				<div className="col-12 col-md-6">
					<img
						src={selectedMovie.imageurl}
						className="img-fluid"
					 />
				</div>
				<div className="col-12 col-md-6">
					<h2 className="mt-3">{selectedMovie.title}</h2>
					<p>
						<strong>Description: </strong>
						{selectedMovie.description}
					</p>
					<p>
						<strong>Release: </strong>
						{new Date(selectedMovie.release).toLocaleDateString()}
					</p>
					<p>
						<strong>Featured: </strong>
						{selectedMovie.featured.toString()}
					</p>
					<p>
						<strong>Director(s): </strong>
					</p>
					<ul>
						{directors.map((director, index) => (
							
							<li key={index}>{director}</li>
						))}
					</ul>
					<p>
						<strong>Starring:</strong>
					</p>
					<ul>
						{actors.map((actor, index) => (
							
							<li key={index}>{actor}</li>
						))}
					</ul>
					<p>
						<strong>Genres</strong>
					</p>
					<ul>
						{genres.map((genre, index) => (
							
							<li key={index}>{genre}</li>
						))}
					</ul>
					
					<button
						className="btn btn-secondary m-3"
						onClick={() => navigate(-1)}
					>
						Edit
					</button>
					
					<button
						className="btn btn-secondary m-3"
						onClick={() => navigate(-1)}
					>
						Back
					</button>
				</div>
			</div>
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
	token: PropTypes.string,
};

export default MovieView;
