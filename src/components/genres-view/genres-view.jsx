import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Pagination, Form } from "react-bootstrap";
import GenreCard from "../genre-card/genre-card";
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const GenresView = ({ genres, darkMode }) => {
	useScrollToTop();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);

	const totalPages = Math.ceil(genres.length / itemsPerPage);

	const displayedGenres = genres
		.sort((a, b) => a.name.localeCompare(b.name))
		.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(Number(event.target.value));
		setCurrentPage(1);
	};
	return genres.length === 0 ? (
		<div>The list is empty!</div>
	) : (
		<Container>
			<h1>All Genres 🎞️</h1>
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
				</Col>
			</Row>
			<Row className="d-flex justify-content-center">
				{displayedGenres.map((genre) => (
					<Col
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={genre._id}
						className="d-flex justify-content-center"
					>
						<GenreCard
							genre={genre}
							darkMode={darkMode}
						/>
					</Col>
				))}
			</Row>
		</Container>
	);
};

GenresView.propTypes = {
	genres: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
		})
	).isRequired,
	darkMode: PropTypes.bool.isRequired,
};

export default GenresView;
