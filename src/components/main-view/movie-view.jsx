import React from 'react';

const MovieView = (props) => {
    return (
      <div>
        <div>
          <img src={props.selectedMovie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{props.selectedMovie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{props.selectedMovie.Description}</span>
        </div>
        <button>Back</button>
      </div>
    );
  };
export default MovieView;