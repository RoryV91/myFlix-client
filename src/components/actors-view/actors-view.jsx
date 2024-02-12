import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import ActorCard from '../actor-card/actor-card';
import useScrollToTop from "../../hooks/use-scroll-to-top/use-scroll-to-top";

const ActorsView = ({ actors, darkMode, onActorClick }) => {
	useScrollToTop();
	return (
		actors.length === 0 ? (
			<div>The list is empty!</div>
		) : (
			<Container>
				<h1>All Actors 🎭</h1>
				<Row className="d-flex justify-content-center">
					{actors.map((actor) => (
						<Col
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={actor._id}
							className="d-flex justify-content-center"
						>
							<ActorCard
								actor={actor}
								darkMode={darkMode}
								onActorClick={onActorClick}
							/>
						</Col>
					))}
				</Row>
			</Container>
		)
	);
};

ActorsView.propTypes = {
	actors: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
	})).isRequired,
	darkMode: PropTypes.bool.isRequired,
	token: PropTypes.string
};

export default ActorsView;