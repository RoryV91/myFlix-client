import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const GenreCard = ({ genre, darkMode }) => {
	return (
		<Card
			className={`${
				darkMode ? "bg-dark text-light" : "bg-light text-dark"
			} m-1 p-2 border border-3 no-break`}
		>
			<Card.Body>
				<Card.Title>{genre.name}</Card.Title>
				<Card.Text>
					{genre.description.substring(0, 40)}
					{genre.description.length > 40 ? "..." : ""}
				</Card.Text>
				<Link
					to={`/genre/${genre._id}`}
					className="stretched-link"
				/>
			</Card.Body>
		</Card>
	);
};

GenreCard.propTypes = {
	genre: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired,
	darkMode: PropTypes.bool.isRequired,
};

export default GenreCard;
