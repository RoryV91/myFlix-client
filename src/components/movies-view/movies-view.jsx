import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const MoviesView = ({ darkMode, movies, token, user, updateUserFavorites }) => {
	useScrollToTop();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [searchTerm, setSearchTerm] = useState("");
	const totalPages = Math.ceil(movies.length / itemsPerPage);
	const displayedMovies = movies
		.filter((movie) =>
			movie.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			{
				/* Sort movies by title, but disregard preceding "The " in the title */
			}
			const titleA = a.title.replace(/^The /i, "");
			const titleB = b.title.replace(/^The /i, "");
			return titleA.localeCompare(titleB);
		})
		.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};
	return movies.length === 0 ? (
		<div>The list is empty!</div>
	) : (
		<Container>
			<h1>All Movies 📼</h1>
			<Row className="gx-3">
				<Col
					md={6}
					className="mb-3 mb-md-0"
				>
					<Form.Group
						controlId="itemsPerPage"
						className="d-flex align-items-center"
					>
						<Col
							xs="auto"
							className="me-3"
						>
							<Form.Label>Items per page:</Form.Label>
						</Col>
						<Col>
							<Form.Select
								value={itemsPerPage}
								onChange={handleItemsPerPageChange}
								style={{ minWidth: "100px" }}
							>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={20}>20</option>
							</Form.Select>
						</Col>
					</Form.Group>
				</Col>
				<Col
					md={6}
					className="d-flex justify-content-end"
				>
					<div className="pagination-container">
						<Pagination
							className={darkMode ? "pagination-dark" : "pagination-light"}
						>
							<Pagination.Prev
								onClick={() => setCurrentPage(currentPage - 1)}
								disabled={currentPage === 1}
							/>

							{Array.from({ length: totalPages }, (_, i) => i + 1)
								.filter(
									(page) =>
										page === 1 ||
										page === totalPages ||
										(page >= currentPage - 2 && page <= currentPage + 2)
								)
								.map((page) => (
									<Pagination.Item
										key={page}
										active={page === currentPage}
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</Pagination.Item>
								))}

							<Pagination.Next
								onClick={() => setCurrentPage(currentPage + 1)}
								disabled={currentPage === totalPages}
							/>
						</Pagination>
					</div>
				</Col>
			</Row>
			<Row className="mb-3">
				<Col md={{ span: 6, offset: 3 }}>
					<Form.Control
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
					/>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center">
				{displayedMovies.map((movie) => (
					<Col
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={movie._id}
						className="d-flex justify-content-center moviecard"
					>
						<MovieCard
							movie={movie}
							darkMode={darkMode}
							user={user}
							token={token}
							updateUserFavorites={updateUserFavorites}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};

MoviesView.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	token: PropTypes.string,
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default MoviesView;
