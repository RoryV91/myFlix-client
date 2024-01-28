import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const MovieView = ({ movies, token }) => {
    const { id } = useParams();
    const location = useLocation();
    const initialSelectedMovie = location.state ? location.state.selectedMovie : movies.find(movie => movie._id === id);
    const [directors, setDirectors] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(initialSelectedMovie);
	const [actors, setActors] = useState([]);
	const [genres, setGenres] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (!selectedMovie) return;

		Promise.all(
			selectedMovie.director_ids.map((id) =>
				fetch(`https://myflixapi.vanblaricom.dev:9999/directors/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json())
			)
		).then((directors) => setDirectors(directors));

		Promise.all(
			selectedMovie.actor_ids.map((id) =>
				fetch(`https://myflixapi.vanblaricom.dev:9999/actors/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json())
			)
		).then((actors) => setActors(actors));

		Promise.all(
			selectedMovie.genre_ids.map((id) =>
				fetch(`https://myflixapi.vanblaricom.dev:9999/genres/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => res.json())
			)
		).then((genres) => setGenres(genres));
	}, [selectedMovie, token]);

	useEffect(() => {
		if (selectedMovie === null) {
			navigate(-1);
		}
	}, [selectedMovie, navigate]);

	if (!selectedMovie) return null;

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
							<li key={index}>
								<Link to={`/director/${director._id}`}>{director.name}</Link>
							</li>
						))}
					</ul>
					<p>
						<strong>Starring:</strong>
					</p>
					<ul>
						{actors.map((actor, index) => (
							<li key={index}>
								<Link
									to={{
										pathname: `/actor/${actor._id}`,
										state: { selectedActor: actor },
									}}
								>
									{actor.name}
								</Link>
							</li>
						))}
					</ul>
					<p>
						<strong>Genres: </strong>
					</p>
					<ul>
						{genres.map((genre, index) => (
							<li key={index}>
								<Link to={`/genre/${genre._id}`}>{genre.name}</Link>
							</li>
						))}
					</ul>

					<button className="btn btn-secondary m-3">Edit</button>
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
	}),
	token: PropTypes.string.isRequired,
};

export default MovieView;
