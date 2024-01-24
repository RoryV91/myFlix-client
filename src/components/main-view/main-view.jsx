import { useState, useEffect } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import Header from "../header/header";
import { Col, Row, Container } from "react-bootstrap";

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
		<div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
			<Header
				user={user}
				handleLogout={handleLogout}
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>

			{!user ? (
				<div className="mx-auto w-75">
					{isLoggingIn ? (
						<LoginView
							onLoggedIn={(user, token) => {
								setUser(user);
								setToken(token);
							}}
						/>
					) : (
						<>
							<p>or</p>
							<SignupView />
						</>
					)}
				</div>
			) : selectedMovie ? (
				<MovieView
					selectedMovie={selectedMovie}
					token={token}
					onBackClick={() => setSelectedMovie(null)}
				/>
			) : movies.length === 0 ? (
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
			)}
		</div>
	);
};

export default MainView;
