import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieClick }) => {
    return <div className="movie-card"
                onClick={ () => 
                    onMovieClick(movie)
                }
        >
        {movie.title}
    </div>;
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageurl: PropTypes.string,
        featured: PropTypes.bool,
        actor_ids: PropTypes.arrayOf(PropTypes.string),
        release: PropTypes.string,
        director_ids: PropTypes.arrayOf(PropTypes.string),
        genre_ids: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;