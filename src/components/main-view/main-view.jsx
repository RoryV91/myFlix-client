// Import necessary libraries and components
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import custom hooks
import useFetchMovies from "../../hooks/use-fetch-movies/use-fetch-movies";
import useFetchGenres from "../../hooks/use-fetch-genres/use-fetch-genres";
import useFetchDirectors from "../../hooks/use-fetch-directors/use-fetch-directors";
import useFetchActors from "../../hooks/use-fetch-actors/use-fetch-actors";

// General views
import Home from "../home-view/home-view";
import Header from "../header/header";
import Footer from "../footer/footer";

// User views
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import UserProfileView from "../user-profile-view/user-profile-view";
import EditProfileView from "../edit-profile-view/edit-profile-view";

// Movie views
import MovieView from "../movie-view/movie-view";
import MoviesView from "../movies-view/movies-view";
import EditMovieView from "../edit-movie-view/edit-movie-view";
import NewMovieView from "../new-movie-view/new-movie-view";

// Genre views
import GenreView from "../genre-view/genre-view";
import GenresView from "../genres-view/genres-view";
import EditGenreView from "../edit-genre-view/edit-genre-view";
import NewGenreView from "../new-genre-view/new-genre-view";

// Actor views
import ActorsView from "../actors-view/actors-view";
import ActorView from "../actor-view/actor-view";
import EditActorView from "../edit-actor-view/edit-actor-view";
import NewActorView from "../new-actor-view/new-actor-view";

// Director views
import DirectorsView from "../directors-view/directors-view";
import DirectorView from "../director-view/director-view";
import EditDirectorView from "../edit-director-view/edit-director-view";
import NewDirectorView from "../new-director-view/new-director-view";

// MainView component
const MainView = () => {
	// Define state variables
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);

	// Use custom hooks to fetch data
	const [movies, setMovies] = useFetchMovies(token);
	const [genres, setGenres] = useFetchGenres(token);
	const [directors, setDirectors] = useFetchDirectors(token);
	const [actors, setActors] = useFetchActors(token);

	// Dark mode state and setter
	const [darkMode, setDarkMode] = useState(() => {
		const saved = localStorage.getItem("darkMode");
		const initialValue = JSON.parse(saved);
		return initialValue || false;
	});

	// Define functions to handle updates
	const updateMovie = (updatedMovie) => {
		setMovies(
			movies.map((movie) =>
				movie._id === updatedMovie._id ? updatedMovie : movie
			)
		);
	};
	const updateGenre = (updatedGenre) => {
		setGenres((prevGenres) => {
			return prevGenres.map((genre) => {
				if (genre._id === updatedGenre._id) {
					return updatedGenre;
				} else {
					return genre;
				}
			});
		});
	};
	const updateDirector = (updatedDirector) => {
		setDirectors((prevDirectors) => {
			return prevDirectors.map((director) => {
				if (director._id === updatedDirector._id) {
					return updatedDirector;
				} else {
					return director;
				}
			});
		});
	};
	const updateActor = (updatedActor) => {
		setActors((prevActors) => {
			return prevActors.map((actor) => {
				if (actor._id === updatedActor._id) {
					return updatedActor;
				} else {
					return actor;
				}
			});
		});
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

	// Define functions to add new documents
	const addMovie = (newMovie) => {
		setMovies((prevMovies) => [...prevMovies, newMovie]);
	};

	const addGenre = (newGenre) => {
		setGenres((prevGenres) => [...prevGenres, newGenre]);
	};

	const addDirector = (newDirector) => {
		setDirectors((prevDirectors) => [...prevDirectors, newDirector]);
	};

	const addActor = (newActor) => {
		setActors((prevActors) => [...prevActors, newActor]);
	};

	// Define functions to delete documents
	const deleteMovie = (deletedMovieId) => {
		setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== deletedMovieId));
	};
	
	const deleteGenre = (deletedGenreId) => {
		setGenres((prevGenres) => prevGenres.filter((genre) => genre._id !== deletedGenreId));
	};
	
	const deleteDirector = (deletedDirectorId) => {
		setDirectors((prevDirectors) => prevDirectors.filter((director) => director._id !== deletedDirectorId));
	};

	const deleteActor = (deletedActorId) => {
		setActors((prevActors) => prevActors.filter((actor) => actor._id !== deletedActorId));
	};

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
							{/* General Views */}
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
							{/* User Views */}
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
							{/* Movie Views */}
							<Route
								path="/movie/:id"
								element={
									<MovieView
										movies={movies}
										token={token}
										updateMovie={updateMovie}
										directors={directors}
										genres={genres}
										actors={actors}
									/>
								}
							/>
							<Route
								path="/movies/view"
								element={
									<MoviesView
										movies={movies}
										directors={directors}
										actors={actors}
										genres={genres}
										token={token}
										darkMode={darkMode}
										user={user}
										updateUserFavorites={updateUserFavorites}
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
								path="/movies/add"
								element={
									<NewMovieView
										addMovie={addMovie}
										darkMode={darkMode}
										token={token}
									/>
								}
							/>
							{/* Genre Views */}
							<Route
								path="/genre/:id"
								element={
									<div className="d-flex justify-content-center align-items-center">
										<GenreView
											genres={genres}
											movies={movies}
											darkMode={darkMode}
										/>
									</div>
								}
							/>
							<Route
								path="/genres/view"
								element={
									<GenresView
										darkMode={darkMode}
										genres={genres}
										movies={movies}
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
										updateGenre={updateGenre}
									/>
								}
							/>
							<Route
								path="/genres/add"
								element={
									<NewGenreView
										addGenre={addGenre}
										darkMode={darkMode}
										token={token}
									/>
								}
							/>
							{/* Actor Views */}
							<Route
								path="/actor/:id"
								element={
									<ActorView
										actors={actors}
										movies={movies}
										darkMode={darkMode}
										token={token}
										deleteActor={deleteActor}
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
								path="/actors/edit/:id"
								element={
									<EditActorView
										actors={actors}
										token={token}
										darkMode={darkMode}
										updateActor={updateActor}
										deleteActor={deleteActor}
									/>
								}
							/>
							<Route
								path="/actors/add"
								element={
									<NewActorView
										addActor={addActor}
										darkMode={darkMode}
										token={token}
									/>
								}
							/>
							{/* Director Views */}
							<Route
								path="/director/:id"
								element={
									<DirectorView
										directors={directors}
										movies={movies}
										token={token}
										darkMode={darkMode}
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
								path="/directors/edit/:id"
								element={
									<EditDirectorView
										directors={directors}
										token={token}
										darkMode={darkMode}
										updateDirector={updateDirector}
									/>
								}
							/>
							<Route
								path="/directors/add"
								element={
									<NewDirectorView
										addDirector={addDirector}
										darkMode={darkMode}
										token={token}
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
