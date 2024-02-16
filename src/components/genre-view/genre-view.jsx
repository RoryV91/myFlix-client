import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";
import axios from "axios";

const GenreView = ({ genres, movies, token, deleteGenre }) => {
	useScrollToTop();
	const { id } = useParams();
	const location = useLocation();
	const initialSelectedGenre = location.state
		? location.state.selectedGenre
		: genres.find((genre) => genre._id === id);
	const [selectedGenre, setSelectedGenre] = useState(initialSelectedGenre);
	const navigate = useNavigate();

	useEffect(() => {
		const updatedSelectedGenre = genres.find((genre) => genre._id === id);
		setSelectedGenre(updatedSelectedGenre);
	}, [genres, id]);

	const thisGenreMovies = movies.filter((movie) =>
		movie.genre_ids.includes(selectedGenre?._id)
	);

	const handleDelete = () => {
		if (
			window.confirm(
				"Are you sure you want to delete this genre? This action cannot be undone."
			)
		) {
			axios
				.delete(
					`https://myflixapi.vanblaricom.dev:9999/genres/${selectedGenre._id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((response) => {
					if (response.status === 200) {
						alert("Genre deleted successfully");

						deleteGenre(selectedGenre._id);
					} else {
						alert("Failed to delete genre");
					}
				})
				.catch((error) => {
					console.error("Error deleting genre", error);
					alert("Failed to delete genre: " + error.message);
				})
				.finally(() => {
					navigate("/genres/view");
				});
		}
	};

	const handleEdit = () => {
		navigate(`/genres/edit/${selectedGenre._id}`, {
			state: { selectedGenre },
		});
	};

	//Handle Back
	const handleBack = () => {
		navigate(-1);
	};

	if (!selectedGenre) return null;

	return (
		<Container className="mt-5">
			<Row>
				<Col
					xs={12}
					md={6}
				>
					<h2 className="mt-3">{selectedGenre.name}</h2>
					<p>
						<strong>📚 Description: </strong>
						{selectedGenre.description}
					</p>
					<p>
						<strong>🍿 Movies: </strong>
					</p>
					{thisGenreMovies.length > 0 ? (
						thisGenreMovies.map((movie, index) => (
							<li key={index}>
								<Link to={`/movie/${movie._id}`}>{movie.title}</Link>
							</li>
						))
					) : (
						<p>No movies found for this genre yet.</p>
					)}
				</Col>
				<Col>
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

GenreView.propTypes = {
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})
	).isRequired,
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			genre_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
		})
	).isRequired,
	token: PropTypes.string.isRequired,
	deleteGenre: PropTypes.func.isRequired,
};

export default GenreView;
