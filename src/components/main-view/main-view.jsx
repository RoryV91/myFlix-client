import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";

const MainView = () => {
	const [movies, setMovies] = useState([]);
	const [user, setUser] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		fetch("https://myflixapi.vanblaricom.dev:9999/movies", {
			headers: {
				Authorization: `Bearer ${token}`
			},
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			setMovies(data);
		})
		.catch((error) => {
			console.error("Error fetching movies:", error);
		});
	}, [token]);

	if (!user) {
		return (
			<LoginView
				onLoggedIn={(user, token) => {
					setUser(user);
					setToken(token);
				}}
			/>
		);
	}

	if (selectedMovie)
		return (
			<MovieView
				selectedMovie={selectedMovie}
				token={token}
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
			<button
				onClick={() => {
					setUser(null);
					setToken(null);
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default MainView;
