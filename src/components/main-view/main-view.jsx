import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Header from "../header/header";

const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [movies, setMovies] = useState([]);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [darkMode, setDarkMode] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(true);

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
			 <div className="d-flex justify-content-center align-items-center main-view">
			<div className={darkMode ? "bg-dark text-light w-75 h-100 d-flex align-items-center justify-content-center" : "bg-light text-dark w-75 h-100 d-flex align-items-center justify-content-center"}>
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
							<LoginView
								onLoggedIn={(user, token) => {
									setUser(user);
									setToken(token);
								}}
							/>
						}
					/>
					<Route
						path="/signup"
						element={<SignupView />}
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
						path="/"
						element={
							movies.length === 0 ? (
								<div>The list is empty!</div>
							) : (
								<Container>
									<Row className="d-flex justify-content-center">
										{movies.map((movie) => (
											<Col
												xs={12}
												sm={6}
												md={4}
												lg={3}
												key={movie._id}
												className="d-flex justify-content-center"
											>
												<MovieCard
													movie={movie}
													darkMode={darkMode}
													onMovieClick={(newSelectedMovie) => {
														setSelectedMovie(newSelectedMovie);
													}}
												/>
											</Col>
										))}
									</Row>
								</Container>
							)
						}
					/>
				</Routes>
			</div>
			</div>
		</Router>
	);
};

export default MainView;
