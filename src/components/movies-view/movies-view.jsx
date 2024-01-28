import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';
import { useNavigate } from 'react-router-dom';

const MoviesView = ({ movies, darkMode }) => {
    const navigate = useNavigate();

    const handleMovieClick = (movie) => {
        navigate(`/movie/${movie._id}`, { state: { selectedMovie: movie } });
    };

    return (
        movies.length === 0 ? (
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
                                onMovieClick={handleMovieClick}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    );
};

export default MoviesView;