import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Header from "../header/header";
import { Col, Row, Container, Form, Button } from "react-bootstrap";

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
			<div>
				<LoginView
					onLoggedIn={(user, token) => {
						setUser(user);
						setToken(token);
					}}
				/>
				<p>or</p>
				<SignupView />
			</div>
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
		<>
			<Header
				user={user}
				onLoggedOut={() => setUser(null)}
			/>
			<Container>
				<Row className="d-flex">
					{movies.map((movie) => (
						<Col
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={movie._id}
							className="d-flex"
						>
							<MovieCard
								movie={movie}
								onMovieClick={(newSelectedMovie) => {
									setSelectedMovie(newSelectedMovie);
								}}
							/>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default MainView;
