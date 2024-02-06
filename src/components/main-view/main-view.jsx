// Import necessary libraries and components
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import custom hooks
import useFetchMovies from "../../hooks/use-fetch-movies/use-fetch-movies";
import useFetchGenres from "../../hooks/use-fetch-genres/use-fetch-genres";
import useFetchDirectors from "../../hooks/use-fetch-directors/use-fetch-directors";
import useFetchActors from "../../hooks/use-fetch-actors/use-fetch-actors";

//General views
import Home from "../home-view/home-view";
import Header from "../header/header";
import Footer from "../footer/footer";

//User views
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import UserProfileView from "../user-profile-view/user-profile-view";
import EditProfileView from "../edit-profile-view/edit-profile-view";

// Movie views
import MovieView from "../movie-view/movie-view";
import MoviesView from "../movies-view/movies-view";
import EditMovieView from "../edit-movie-view/edit-movie-view";

// Genre views
import GenreView from "../genre-view/genre-view";
import GenresView from "../genres-view/genres-view";
import EditGenreView from "../edit-genre-view/edit-genre-view";

// Actor views
import ActorsView from "../actors-view/actors-view";
import ActorView from "../actor-view/actor-view";
import EditActorView from "../edit-actor-view/edit-actor-view";

// Director views
import DirectorsView from "../directors-view/directors-view";
import DirectorView from "../director-view/director-view";
import EditDirectorView from "../edit-director-view/edit-director-view";

// MainView component
const MainView = () => {
	// Define state variables
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem("darkMode");
		const initialValue = JSON.parse(saved);
		return initialValue || false;
	});
	const updateMovie = (updatedMovie) => {
		setMovies(
			movies.map((movie) =>
				movie._id === updatedMovie._id ? updatedMovie : movie
			)
		);
	};
	const updateUserFavorites = (updatedFavorites) => {
		setUser((prevUser) => ({
			...prevUser,
			user_movie_ids: updatedFavorites,
		}));
	};
	const updateUser = (updatedUser) => {
		setUser((prevUser) => ({
			...prevUser,
			...updatedUser,
			dob: new Date(updatedUser.dob),
		}));
	};

	// Use custom hooks to fetch data
	const movies = useFetchMovies(token);
	const genres = useFetchGenres(token);
	const directors = useFetchDirectors(token);
	const actors = useFetchActors(token);

	// Scroll to top on page load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Handle Dark Mode
	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	// Handle Logout
	const handleLogout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

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
					<div className="pt-3 container-min-vh-100">
						<Routes>
							<Route
								path="/"
								element={<Home />}
							/>
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
										movies={movies}
										token={token}
										updateMovie={updateMovie}
									/>
								}
							/>
							<Route
								path="/director/:id"
								element={
									<DirectorView
										directors={directors}
										token={token}
										darkMode={darkMode}
									/>
								}
							/>
							<Route
								path="/actor/:id"
								element={
									<ActorView
										actors={actors}
										token={token}
										darkMode={darkMode}
									/>
								}
							/>
							<Route
								path="/genre/:id"
								element={
									<div className="d-flex justify-content-center align-items-center">
										<GenreView
											genres={genres}
											movies={movies}
											token={token}
											darkMode={darkMode}
										/>
									</div>
								}
							/>

							<Route
								path="/movies/view"
								element={
									<MoviesView
										movies={movies}
										token={token}
										darkMode={darkMode}
										user={user}
										updateUserFavorites={updateUserFavorites}
									/>
								}
							/>
							<Route
								path="/actors/view"
								element={
									<ActorsView
										darkMode={darkMode}
										token={token}
										actors={actors}
									/>
								}
							/>
							<Route
								path="/directors/view"
								element={
									<DirectorsView
										darkMode={darkMode}
										token={token}
										directors={directors}
									/>
								}
							/>
							<Route
								path="/genres/view"
								element={
									<GenresView
										darkMode={darkMode}
										token={token}
										genres={genres}
									/>
								}
							/>
							<Route
								path="/profile/view/:id"
								element={
									<UserProfileView
										user={user}
										darkMode={darkMode}
										token={token}
										movies={movies}
										updateUserFavorites={updateUserFavorites}
										updateUser={updateUser}
										handleLogout={handleLogout}
									/>
								}
							/>
							<Route
								path="/movies/edit/:id"
								element={
									<EditMovieView
										movies={movies}
										actors={actors}
										directors={directors}
										genres={genres}
										token={token}
										darkMode={darkMode}
										updateMovie={updateMovie}
									/>
								}
							/>
							<Route 
								path="/genres/edit/:id"
								element={
									<EditGenreView
										genres={genres}
										token={token}
										darkMode={darkMode}
									/>
								}
							/>
							<Route
								path="/profile/edit/:id"
								element={
									<EditProfileView
										user={user}
										darkMode={darkMode}
										token={token}
										updateUser={updateUser}
									/>
								}
							/>
						</Routes>
					</div>
				</div>
			</div>
			<Footer darkMode={darkMode} />
		</Router>
	);
};

export default MainView;
