import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import ActionButtons from "../action-buttons/action-buttons";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const GenreView = ({ genres, movies }) => {
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
		// code to handle delete action
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

export default GenreView;
