import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import GenreCard from '../genre-card/genre-card';
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const GenresView = ({ genres, darkMode }) => {
    useScrollToTop();
    return (
        genres.length === 0 ? (
            <div>The list is empty!</div>
        ) : (
            <Container>
                <h1>All Genres 🎞️</h1>
                <Row className="d-flex justify-content-center">
                    {genres.map((genre) => (
                        <Col
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={genre._id}
                            className="d-flex justify-content-center"
                        >
                            <GenreCard
                                genre={genre}
                                darkMode={darkMode}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    );
};

GenresView.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
    })).isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default GenresView;