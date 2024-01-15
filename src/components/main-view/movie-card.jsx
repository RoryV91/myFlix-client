import React from 'react';

const MovieCard = (props) => {
    return <div className="movie-card">
        {props.movie.Title}
    </div>;
};

export default MovieCard;