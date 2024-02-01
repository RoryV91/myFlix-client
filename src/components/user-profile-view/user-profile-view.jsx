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
		<Container className="mt-5 vh-100">
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
					<Col xs={12} className="m-3">
						<Button
							variant="warning"
							as={Link}
							to={`/profile/edit/${user._id}`}
						>
							Edit Profile 🪪
						</Button>
					</Col>
					<Col xs={12} className="m-3">
						<Button
							variant="info"
							onClick={() => navigate(-1)}
						>
							Back ⏮️
						</Button>
					</Col>
					<Col xs={12} className="m-3">
						<Button
							variant="danger"
							as={Link}
							to={`/users/${user._id}/deregister`}
						>
							Delete Profile 🚫
						</Button>
					</Col>
				</Col>
				<Col
					xs={12}
					md={6}
				>
					<h2>Favorite Movies</h2>
					{favoriteMovies?.map((movie) => (
						<MovieCard
							key={movie._id}
							movie={movie}
							darkMode={darkMode}
                            user={user}
						/>
					))}
				</Col>
			</Row>
		</Container>
	);
}

export default UserProfileView;
