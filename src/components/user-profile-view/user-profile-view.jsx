import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

function UserProfileView({
	user,
	movies,
	darkMode,
	updateUserFavorites,
	token,
	handleLogout,
}) {
	useScrollToTop();
	const navigate = useNavigate();
	const favoriteMovies = movies.filter((movie) =>
		user.user_movie_ids.includes(movie._id)
	);
	const handleUserLogout = () => {
		handleLogout();
		navigate("/");
	};

	const deleteProfile = () => {
		if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
			axios
				.delete(
					`https://myflixapi.vanblaricom.dev:9999/users/${user._id}/delete`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then(() => {
					alert("Profile deleted successfully");
					handleUserLogout();
				})
				.catch((error) => {
					console.error("Error deleting profile", error);
					alert("Failed to delete profile");
				});
		}
	};

	return (
		<Container className="mt-5 mb-5 container-min-vh-100">
			<Row>
				<Col
					xs={12}
					md={6}
				>
					<h1>Profile</h1>
					<p className="mt-3">
						<strong>Username:</strong> {user.username}
					</p>
					<p className="mt-3">
						<strong>Email:</strong> {user.email}
					</p>
					<p className="mt-3">
						<strong>Date of Birth:</strong>{" "}
						{user?.dob && new Date(user.dob).toLocaleDateString('en-US')}
					</p>
				</Col>
				<Col
					xs={12}
					md={6}
				>
					<Col
						xs={12}
						className="m-3"
					>
						<Button
							variant="warning"
							as={Link}
							to={`/profile/edit/${user._id}`}
						>
							Edit Profile 🪪
						</Button>
					</Col>
					<Col
						xs={12}
						className="m-3"
					>
						<Button
							variant="info"
							onClick={() => navigate(-1)}
						>
							Back ⏮️
						</Button>
					</Col>
					<Col
						xs={12}
						className="m-3"
					>
						<Button
							variant="danger"
							onClick={deleteProfile}
						>
							Delete Profile 🚫
						</Button>
					</Col>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<h2>Your Favorites</h2>
					<Row className="d-flex justify-content-center">
						{favoriteMovies?.map((movie) => (
							<Col
								xs={12}
								sm={6}
								md={4}
								lg={3}
								key={movie._id}
								className="d-flex justify-content-center moviecard"
							>
								<MovieCard
									key={movie._id}
									movie={movie}
									darkMode={darkMode}
									user={user}
									token={token}
									updateUserFavorites={updateUserFavorites}
								/>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

UserProfileView.propTypes = {
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		dob: PropTypes.string,
		user_movie_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			imageurl: PropTypes.string,
			featured: PropTypes.bool,
			actor_ids: PropTypes.arrayOf(PropTypes.string),
			release: PropTypes.string,
			director_ids: PropTypes.arrayOf(PropTypes.string),
			genre_ids: PropTypes.arrayOf(PropTypes.string),
		})
	).isRequired,
	darkMode: PropTypes.bool.isRequired,
	updateUserFavorites: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
	handleLogout: PropTypes.func.isRequired,
};

export default UserProfileView;
