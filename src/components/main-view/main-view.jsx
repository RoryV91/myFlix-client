import { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Header from "../header/header";
import Footer from "../footer/footer";
import Home from "../home-view/home-view";
import DirectorView from "../director-view/director-view";
import ActorView from "../actor-view/actor-view";
import GenreView from "../genre-view/genre-view";
import MoviesView from "../movies-view/movies-view";

const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [movies, setMovies] = useState([]);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [isLoggingIn, setIsLoggingIn] = useState(true);
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem("darkMode");
		const initialValue = JSON.parse(saved);
		return initialValue || false;
	});

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	const handleLogout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	useEffect(() => {
		if (!token) return;

		fetch("https://myflixapi.vanblaricom.dev:9999/movies", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setMovies(data))
			.catch((error) => console.error("Error fetching movies:", error));
	}, [token]);

	return (
		<Router>
			<div
				className={
					darkMode
						? "bg-dark text-light w-100 h-100 d-flex align-items-center justify-content-center"
						: "bg-light text-dark w-100 h-100 d-flex align-items-center justify-content-center"
				}
			>
				<div
					className={
						darkMode
							? "bg-dark text-light w-75 h-100 d-flex align-items-center justify-content-center"
							: "bg-light text-dark w-75 h-100 d-flex align-items-center justify-content-center"
					}
				>
					<Header
						user={user}
						handleLogout={handleLogout}
						darkMode={darkMode}
						setDarkMode={setDarkMode}
					/>

					<Routes>
						<Route
							path="/login"
							element={
								<div className="d-flex justify-content-center align-items-center vh-100">
									<LoginView
										onLoggedIn={(user, token) => {
											setUser(user);
											setToken(token);
										}}
									/>
								</div>
							}
						/>
						<Route
							path="/signup"
							element={
								<div className="d-flex justify-content-center align-items-center vh-100">
									<SignupView />
								</div>
							}
						/>
						<Route
							path="/movie/:id"
							element={
								<MovieView
									selectedMovie={selectedMovie}
									token={token}
									onBackClick={() => setSelectedMovie(null)}
								/>
							}
						/>
						<Route
							path="/director/:id"
							element={<DirectorView />}
						/>
						<Route
							path="/actor/:id"
							element={<ActorView />}
						/>
						<Route
							path="/genre/:id"
							element={<GenreView />}
						/>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/movies/view"
							element={
								<MoviesView
									movies={movies}
									darkMode={darkMode}
									onMovieClick={(newSelectedMovie) => {
										setSelectedMovie(newSelectedMovie);
									}}
								/>
							}
						/>
					</Routes>
					
				</div>
				
			</div>
			<Footer darkMode={darkMode} />
		</Router>
	);
};

export default MainView;
