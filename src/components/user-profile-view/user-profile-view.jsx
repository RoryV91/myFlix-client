import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";
import { Container, Row, Col, Button } from "react-bootstrap";

function UserProfileView({ user, movies, darkMode }) {
	const navigate = useNavigate();
	const favoriteMovies = movies.filter((movie) =>
		user.user_movie_ids.includes(movie._id)
	);

	return (
		<Container className="mt-5 mb-5 container-min-vh-100">
			<Row>
				<Col
					xs={12}
					md={6}
				>
					<h1>Profile View</h1>
					<p className="mt-3">
						<strong>Username:</strong> {user.username}
					</p>
					<p className="mt-3">
						<strong>Email:</strong> {user.email}
					</p>
					<p className="mt-3">
						<strong>Date of Birth:</strong>{" "}
						{new Date(user?.dob)?.toLocaleDateString()}
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
							as={Link}
							to={`/users/${user._id}/deregister`}
						>
							Delete Profile 🚫
						</Button>
					</Col>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<h2>Favorite Movies</h2>
					<Row>
						{favoriteMovies?.map((movie) => (
							<Col
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={movie._id}
						className="d-flex justify-content-center"
							>
								<MovieCard
									key={movie._id}
									movie={movie}
									darkMode={darkMode}
									user={user}
								/>
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default UserProfileView;
