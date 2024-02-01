import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";


const MoviesView = ({ darkMode, movies, token, user, updateUserFavorites }) => {
	return movies.length === 0 ? (
		<div>The list is empty!</div>
	) : (
		<Container>
			<Row className="d-flex justify-content-center">
				{movies.map((movie) => (
					<Col
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={movie._id}
						className="d-flex justify-content-center"
					>
						<MovieCard
							movie={movie}
							darkMode={darkMode}
							user={user}
							token={token}
							updateUserFavorites={updateUserFavorites}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};

MoviesView.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	token: PropTypes.string,
	movies: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
	})).isRequired,
};

export default MoviesView;
