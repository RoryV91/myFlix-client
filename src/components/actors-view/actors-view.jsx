import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import ActorCard from "../actor-card/actor-card";

const ActorsView = ({ actors, darkMode, onActorClick }) => {
	return (
		<Container>
			<Row>
				{actors.map((actor) => (
					<Col
						md={3}
						key={actor._id}
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
	);
};

ActorsView.propTypes = {
	actors: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			bio: PropTypes.string.isRequired,
            birth: PropTypes.string.isRequired,
            death: PropTypes.string,
            imageurl: PropTypes.string.isRequired,
		})
	).isRequired,
	darkMode: PropTypes.bool.isRequired,
};

export default ActorsView;
