import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ActorCard = ({ actor, darkMode, onActorClick }) => {
    return (
        <Card className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} m-1 p-2 border border-3 no-break`}
        onClick={()=>onActorClick(actor)}>
            <Card.Img variant="top" src={actor.imageurl} />
            <Card.Body>
                <Card.Title>{actor.name}</Card.Title>
                <Card.Text>
                    {actor.bio.substring(0, 40)}{actor.bio.length > 40 ? "..." : ""}
                </Card.Text>
                <Link to={`/actor/${actor._id}`} className="stretched-link" />
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