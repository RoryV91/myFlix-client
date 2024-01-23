import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";

const MainView = () => {
	const [movies, setMovies] = useState([]);
	const [user, setUser] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState(null);

	useEffect(() => {
		fetch("https://myflixapi.vanblaricom.dev:9999/movies")
			.then((response) => response.json())
			.then((data) => {
				setMovies(data);
			})
			.catch((error) => {
				console.error("Error fetching movies:", error);
			});
	}, []);

	if (!user) {
		return <LoginView />;
	  }


	if (selectedMovie)
		return (
			<MovieView
				selectedMovie={selectedMovie}
				onBackClick={() => setSelectedMovie(null)}
			/>
		);

	if (movies.length === 0) {
		return <div>The list is empty!</div>;
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie._id}
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
			))}
		</div>
	);
};

export default MainView;
