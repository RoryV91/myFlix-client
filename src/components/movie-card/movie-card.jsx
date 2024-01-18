import React from 'react';

const MovieCard = (props) => {
    return <div className="movie-card"
                onClick={ () => 
                    props.onMovieClick(props.movie)
                }
        >
        {props.movie.Title}
    </div>;
};

export default MovieCard;