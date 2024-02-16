import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";
import axios from "axios";

const MovieView = ({
	movies,
	genres,
	directors,
	actors,
	deleteMovie,
	token,
}) => {
	useScrollToTop();
	const { id } = useParams();
	const location = useLocation();
	const initialSelectedMovie = location.state
		? location.state.selectedMovie
		: movies.find((movie) => movie._id === id);
	const [selectedMovie, setSelectedMovie] = useState(initialSelectedMovie);
	const navigate = useNavigate();

	useEffect(() => {
		const updatedSelectedMovie = movies.find((movie) => movie._id === id);
		setSelectedMovie(updatedSelectedMovie);
	}, [movies, id]);

	const thisMovieDirectors = directors.filter((director) =>
		selectedMovie?.director_ids.includes(director._id)
	);
	const thisMovieActors = actors.filter((actor) =>
		selectedMovie?.actor_ids.includes(actor._id)
	);
	const thisMovieGenres = genres.filter((genre) =>
		selectedMovie?.genre_ids.includes(genre._id)
	);

	const handleDelete = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this movie? This action cannot be undone."
			)
		) {
			axios
				.delete(
					`https://myflixapi.vanblaricom.dev:9999/movies/${selectedMovie._id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((response) => {
					if (response.status === 200) {
						alert("Movie deleted successfully");

						deleteMovie(selectedMovie._id);
					} else {
						alert("Failed to delete movie");
					}
				})
				.catch((error) => {
					console.error("Error deleting movie", error);
					alert("Failed to delete movie: " + error.message);
				})
				.finally(() => {
					navigate("/movies/view");
				});
		}
	};

	// Open edit movie view
	const handleEdit = () => {
		navigate(`/movies/edit/${selectedMovie._id}`, {
			state: { movie: selectedMovie },
		});
	};

	//Handle Back
	const handleBack = () => {
		navigate(-1);
	};

	// Back if no movie is selected
	useEffect(() => {
		if (selectedMovie === null) {
			navigate(-1);
		}
	}, [selectedMovie, navigate]);

	if (!selectedMovie) return null;

	return (
		<Container className="mt-5 vh-100">
			<Row>
				<Col
					xs={12}
					md={6}
				>
					<img
						src={selectedMovie.imageurl}
						className="img-fluid"
					/>
				</Col>
				<Col
					xs={12}
					md={6}
				>
					<h2 className="mt-3">{selectedMovie.title}</h2>
					<p>
						<strong>📰 Description: </strong>
						{selectedMovie.description}
					</p>
					<p>
						<strong>🗓️ Release: </strong>
						{selectedMovie.release
							? new Date(selectedMovie.release).toLocaleDateString()
							: "Release date not set"}
					</p>
					<p>
						<strong>📢 Featured: </strong>
						{selectedMovie.featured ? "✅" : "🚫"}
					</p>
					<p>
						<strong>🎬 Director(s): </strong>
					</p>
					<ul>
						{thisMovieDirectors && thisMovieDirectors.length > 0 ? (
							thisMovieDirectors.map((director, index) => (
								<li key={index}>
									<Link to={`/director/${director._id}`}>{director.name}</Link>
								</li>
							))
						) : (
							<li>No directors found</li>
						)}
					</ul>
					<p>
						<strong>🌟 Starring:</strong>
					</p>
					<ul>
						{thisMovieActors && thisMovieActors.length > 0 ? (
							thisMovieActors.map((actor, index) => (
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
							))
						) : (
							<li>No actors found</li>
						)}
					</ul>
					<p>
						<strong>🎞️ Genres:</strong>
					</p>
					<ul>
						{thisMovieGenres && thisMovieGenres.length > 0 ? (
							thisMovieGenres.map((genre, index) => (
								<li key={index}>
									<Link to={`/genre/${genre._id}`}>{genre.name}</Link>
								</li>
							))
						) : (
							<li>No genres found</li>
						)}
					</ul>
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

MovieView.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			imageurl: PropTypes.string,
			featured: PropTypes.bool,
			actor_ids: PropTypes.arrayOf(PropTypes.string),
			release: PropTypes.string,
			director_ids: PropTypes.arrayOf(PropTypes.string),
			genre_ids: PropTypes.arrayOf(PropTypes.string),
		})
	),
	token: PropTypes.string,
};

export default MovieView;
