const MovieView = (props) => {
    return (
      <div>
        <div>
          <img src={selectedMovie.ImagePath} />
        </div>
        <div>
          <span>Title: </span>
          <span>{selectedMovie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{selectedMovie.Description}</span>
        </div>
      </div>
    );
  };
export default MovieView;