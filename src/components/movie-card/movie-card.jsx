import React from 'react';

const MovieCard = (props) => {
    return <div className="movie-card"
                onClick={ () => 
                    props.onMovieClick(props.movie)
                }
        >
        {props.movie.title}
    </div>;
};

export default MovieCard;