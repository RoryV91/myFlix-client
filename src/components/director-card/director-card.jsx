import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DirectorCard = ({ director, darkMode }) => {
    return (
        <Card className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} m-1 p-2 border border-3 no-break`}>
            <Card.Img variant="top" src={director.imageurl} />
            <Card.Body>
                <Card.Title>{director.name}</Card.Title>
                <Card.Text>
                    {director.bio.substring(0, 40)}{director.bio.length > 40 ? "..." : ""}
                </Card.Text>
                <Link to={`/director/${director._id}`} className="stretched-link" />
            </Card.Body>
        </Card>
    );
};

DirectorCard.propTypes = {
    director: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        imageurl: PropTypes.string,
    }).isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default DirectorCard;