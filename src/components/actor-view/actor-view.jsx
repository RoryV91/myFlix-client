import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import ActorCard from '../actor-card/actor-card';

const ActorsView = ({ actors, darkMode }) => {
    return (
        actors.length === 0 ? (
            <div>The list is empty!</div>
        ) : (
            <Container>
                <Row className="d-flex justify-content-center">
                    {actors.map((actor) => (
                        <Col
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={actor._id}
                            className="d-flex justify-content-center"
                        >
                            <ActorCard
                                actor={actor}
                                darkMode={darkMode}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    );
};

ActorsView.propTypes = {
    actors: PropTypes.array.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default ActorsView;