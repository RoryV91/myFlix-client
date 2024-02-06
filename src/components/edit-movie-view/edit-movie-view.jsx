import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const EditMovieView = ({
	movies,
	actors,
	directors,
	genres,
	token,
	onEdit,
	darkMode,
	updateMovie,
}) => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [isLoading, setIsLoading] = useState(!movie);
	const [error, setError] = useState(null);
	const { register, handleSubmit, setValue, control } = useForm();
	const navigate = useNavigate();
	const [selectedDirectors, setSelectedDirectors] = useState([]);
	const [selectedActors, setSelectedActors] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState("");
	const [selectedDirector, setSelectedDirector] = useState("");
	const [selectedActor, setSelectedActor] = useState("");

	useEffect(() => {
		if (movies && directors && actors && genres) {
			const foundMovie = movies.find((movie) => movie._id === id);
			if (foundMovie) {
				setValue("title", foundMovie.title);
				setValue("description", foundMovie.description);
				setValue("imageurl", foundMovie.imageurl);
				setValue("featured", foundMovie.featured);
				setValue("release", foundMovie.release);

				setSelectedDirectors(
					foundMovie.director_ids ? foundMovie.director_ids : []
				);
				setSelectedActors(foundMovie.actor_ids ? foundMovie.actor_ids : []);
				setSelectedGenres(foundMovie.genre_ids ? foundMovie.genre_ids : []);

				setMovie(foundMovie);
			}
		}
		setIsLoading(false);
	}, [movies, directors, actors, genres, setValue, id]);

	const onSubmit = async (data) => {
		try {
			data.genre_ids = selectedGenres;
			data.director_ids = selectedDirectors;
			data.actor_ids = selectedActors;
			delete data.genres;
			delete data.directors;
			delete data.actors;
			console.log(data);
			console.log(token);
			const response = await axios.put(
				`https://myflixapi.vanblaricom.dev:9999/movies/${movie._id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				navigate(`/movie/${movie._id}`);
			}
		} catch (error) {
			console.error("Error updating movie:", error.response);
			setError("Error updating movie");
		}
	};

	if (error) {
		return (
			<Alert
				variant="danger"
				onClose={() => setError(null)}
				dismissible
			>
				{error}
			</Alert>
		);
	}

	const onDelete = async () => {
		console.log(movie._id);
		console.log("onDelete");
		try {
			const response = await axios.delete(
				`https://myflixapi.vanblaricom.dev:9999/movies/${movie._id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				console.log("Movie deleted successfully");
				navigate("/movies");
			}
		} catch (error) {
			console.error("Error deleting movie:", error);
		}
	};

	// Add an actor, director, or genre to the selectedActors, selectedDirectors, or selectedGenres arrays
	const handleAddActor = () => {
		if (selectedActor && !selectedActors.includes(selectedActor)) {
			setSelectedActors((prevActors) => [...prevActors, selectedActor]);
			setSelectedActor(""); 
		}
	};
	
	const handleAddDirector = () => {
		if (selectedDirector && !selectedDirectors.includes(selectedDirector)) {
			setSelectedDirectors((prevDirectors) => [...prevDirectors, selectedDirector]);
			setSelectedDirector(""); 
		}
	};

	const handleAddGenre = () => {
		if (selectedGenre && !selectedGenres.includes(selectedGenre)) {
			setSelectedGenres((prevGenres) => [...prevGenres, selectedGenre]);
			setSelectedGenre(""); 
		}
	};

	// Update selectedActor, selectedDirector, and selectedGenre when an actor, director, or genre is selected from the dropdowns
	const handleSelectActor = (event) => {
		setSelectedActor(event.target.value);
	};

	const handleSelectDirector = (event) => {
		setSelectedDirector(event.target.value);
	};

	const handleSelectGenre = (event) => {
		setSelectedGenre(event.target.value);
	};

	// Remove an actor, director, or genre from the selectedActors, selectedDirectors, or selectedGenres arrays
	const handleRemoveDirector = (id) => {
		setSelectedDirectors(
			selectedDirectors.filter((directorId) => directorId !== id)
		);
	};

	const handleRemoveActor = (id) => {
		setSelectedActors(selectedActors.filter((actorId) => actorId !== id));
	};

	const handleRemoveGenre = (id) => {
		setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
	};

	// Render a loading message while the data is being fetched
	if (isLoading || !movie || !directors || !actors || !genres) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="progress w-50">
					<div className="indeterminate"></div>
				</div>
			</div>
		);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>📼 Title</Form.Label>
						<Form.Control {...register("title")} />
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>📰 Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={5}
							{...register("description")}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>📚 Genres</Form.Label>
						<Controller
							name="genres"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<Form.Control
									as="select"
									className="form-select"
									{...field}
									onChange={(event) => {
										field.onChange(event);
										handleSelectGenre(event);
									}}
								>
									<option
										disabled
										value=""
									>
										Select genre...
									</option>
									{genres.map((genre) => (
										<option
											key={genre._id}
											value={genre._id}
										>
											{genre.name}
										</option>
									))}
								</Form.Control>
							)}
						/>
						<Button
							onClick={handleAddGenre}
							className="mt-1 btn btn-success"
						>
							Add ➕
						</Button>
						<table
							className={`mt-3 table table-striped ${
								darkMode ? "table-dark" : "table-light"
							}`}
						>
							<thead>
								<tr>
									<th>Genre name 📽️</th>
									<th>Remove 🪄</th>
								</tr>
							</thead>
							<tbody>
								{selectedGenres.map((id) => {
									const genre = genres.find((genre) => genre._id === id);
									if (genre) {
										return (
											<tr key={id}>
												<td>{genre.name}</td>
												<td>
													<Button
														onClick={() => handleRemoveGenre(id)}
														className="btn-danger btn-sm"
													>
														➖
													</Button>
												</td>
											</tr>
										);
									}
								})}
							</tbody>
						</table>
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>🎬 Director(s)</Form.Label>
						<Controller
							name="directors"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<Form.Control
									as="select"
									className="form-select"
									{...field}
									onChange={(event) => {
										field.onChange(event);
										handleSelectDirector(event);
									}}
								>
									<option
										disabled
										value=""
									>
										Select director...
									</option>
									{directors.map((director) => (
										<option
											key={director._id}
											value={director._id}
										>
											{director.name}
										</option>
									))}
								</Form.Control>
							)}
						/>
						<Button
							onClick={handleAddDirector}
							className="mt-1 btn btn-success"
						>
							Add ➕
						</Button>
						<table
							className={`mt-3 table table-striped ${
								darkMode ? "table-dark" : "table-light"
							}`}
						>
							<thead>
								<tr>
									<th>Name 🪪</th>
									<th>Remove 🪄</th>
								</tr>
							</thead>
							<tbody>
								{selectedDirectors.map((id) => {
									const director = directors.find(
										(director) => director._id === id
									);
									if (director) {
										return (
											<tr key={id}>
												<td>{director.name}</td>
												<td>
													<Button
														onClick={() => handleRemoveDirector(id)}
														className="btn-danger btn-sm"
													>
														➖
													</Button>
												</td>
											</tr>
										);
									}
									return null;
								})}
							</tbody>
						</table>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>🎭 Actors</Form.Label>
						<Controller
							name="actors"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<Form.Control
									as="select"
									className="form-select"
									{...field}
									onChange={(event) => {
										field.onChange(event);
										handleSelectActor(event);
									}}
								>
									<option
										disabled
										value=""
									>
										Select actor...
									</option>
									{actors.map((actor) => (
										<option
											key={actor._id}
											value={actor._id}
										>
											{actor.name}
										</option>
									))}
								</Form.Control>
							)}
						/>
						<Button
							onClick={handleAddActor}
							className="mt-1 btn btn-success"
						>
							Add ➕
						</Button>
						<table
							className={`mt-3 table table-striped ${
								darkMode ? "table-dark" : "table-light"
							}`}
						>
							<thead>
								<tr>
									<th>Name 🪪</th>
									<th>Remove 🪄</th>
								</tr>
							</thead>
							<tbody>
								{selectedActors.map((id) => {
									const actor = actors.find((actor) => actor._id === id);
									if (actor) {
										return (
											<tr key={id}>
												<td>{actor.name}</td>
												<td>
													<Button
														onClick={() => handleRemoveActor(id)}
														className="btn-danger btn-sm"
													>
														➖
													</Button>
												</td>
											</tr>
										);
									}
								})}
							</tbody>
						</table>
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>🔗 Image URL</Form.Label>
						<Form.Control {...register("imageurl")} />
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>📢 Featured</Form.Label>
						<Form.Check {...register("featured")} />
					</Form.Group>
				</Col>
				<Col md={6}>
					<Form.Group className="mb-3">
						<Form.Label>🗓️ Release</Form.Label>
						<Controller
							name="release"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<DatePicker
									selected={field.value && new Date(field.value)}
									onChange={(date) => field.onChange(date.toISOString())}
									dateFormat="yyyy-MM-dd"
									className="form-control"
								/>
							)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col
					xs={12}
					md={4}
					className="mb-3 mb-md-0 text-center"
				>
					<Button
						variant="danger"
						type="button"
						onClick={onDelete}
						className="w-100"
					>
						Delete Movie 🗑️
					</Button>
				</Col>
				<Col
					xs={12}
					md={4}
					className="mb-3 mb-md-0 text-center"
				>
					<Button
						variant="info"
						type="button"
						onClick={() => navigate(-1)}
						className="w-100"
					>
						Back ⏮️
					</Button>
				</Col>
				<Col
					xs={12}
					md={4}
					className="text-md-end"
				>
					<Button
						variant="success"
						type="submit"
						className="w-100"
					>
						Save Changes 💾
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

EditMovieView.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			imageurl: PropTypes.string.isRequired,
			featured: PropTypes.bool.isRequired,
			release: PropTypes.string.isRequired,
			director_ids: PropTypes.arrayOf(PropTypes.string),
			actor_ids: PropTypes.arrayOf(PropTypes.string),
			genre_ids: PropTypes.arrayOf(PropTypes.string),
		})
	),
	actors: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	),
	directors: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	),
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	),
	token: PropTypes.string
};

export default EditMovieView;
