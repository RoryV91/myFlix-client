import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ActionButtons from "../action-buttons/action-buttons";

const GenreView = ({ token }) => {
	const { id } = useParams();
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://myflixapi.vanblaricom.dev:9999/genres/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((genre) => setSelectedGenre(genre));

		fetch("https://myflixapi.vanblaricom.dev:9999/movies", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((movies) => {
				setMovies(movies.filter((movie) => movie.genre_ids.includes(id)));
			});
	}, [id, token]);

	const handleDelete = () => {
		// code to handle delete action
	};

	const handleEdit = () => {
		// code to handle edit action
	};

	//Handle Back
	const handleBack = () => {
		navigate(-1);
	};

	if (!selectedGenre || movies.length === 0) return null;

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
					{movies.map((movie, index) => {
						return (
							<li key={index}>
								<Link to={`/movie/${movie._id}`}>{movie.title}</Link>
							</li>
						);
					})}
					
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
