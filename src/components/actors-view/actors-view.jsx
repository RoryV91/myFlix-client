import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ActorCard from '../actor-card/actor-card';

const ActorsView = ({ actors, darkMode }) => {
    return (
        <Container>
            <Row>
                {actors.map(actor => (
                    <Col md={3} key={actor._id}>
                        <ActorCard actor={actor} darkMode={darkMode} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ActorsView;