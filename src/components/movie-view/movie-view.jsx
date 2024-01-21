import React from "react";

const MovieView = (props) => {
	return (
		<div>
			<div>
				<img src={props.selectedMovie.imageurl} />
			</div>
			<div>
				<span>Title: </span>
				<span>{props.selectedMovie.title}</span>
			</div>
			<div>
				<span>Description: </span>
				<span>{props.selectedMovie.description}</span>
			</div>
			<button onClick={props.onBackClick}>Back</button>
		</div>
	);
};

export default MovieView;
