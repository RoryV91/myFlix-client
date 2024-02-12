import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import DirectorCard from '../director-card/director-card';
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const DirectorsView = ({ directors, darkMode, onDirectorClick }) => {
    useScrollToTop();
    return (
        !directors || directors.length === 0 ? (
            <div>The list is empty!</div>
        ) : (
            <Container>
                <h1>All Directors 🎬</h1>
                <Row className="d-flex justify-content-center">
                    {directors.map((director) => (
                        <Col
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={director._id}
                            className="d-flex justify-content-center"
                        >
                            <DirectorCard
                                director={director}
                                darkMode={darkMode}
                                onDirectorClick={onDirectorClick}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    );
};

DirectorsView.propTypes = {
    directors: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        imageurl: PropTypes.string,
    })).isRequired,
    darkMode: PropTypes.bool.isRequired,
    onDirectorClick: PropTypes.func,
};

export default DirectorsView;

