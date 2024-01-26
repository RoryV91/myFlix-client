import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ActorCard = ({ actor, darkMode }) => {
    return (
        <Card className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} m-3`}>
            <Card.Img variant="top" src={actor.imageurl} />
            <Card.Body>
                <Card.Title>{actor.name}</Card.Title>
                <Card.Text>
                    {actor.bio}
                </Card.Text>
                <Link to={`/actor/${actor._id}`}>
                    <Button variant="primary">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

ActorCard.propTypes = {
    actor: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        imageurl: PropTypes.string,
    }).isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default ActorCard;