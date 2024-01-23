import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";

const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [movies, setMovies] = useState([]);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [token, setToken] = useState(storedToken ? storedToken : null);

	useEffect(() => {
		if (!token) return;

		fetch("https://myflixapi.vanblaricom.dev:9999/movies", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((movies) => {
				setMovies(movies);
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
					localStorage.clear();
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default MainView;
