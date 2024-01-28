import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useFetchActors from "../../hooks/use-fetch-actors/use-fetch-actors";
import useFetchDirectors from "../../hooks/use-fetch-directors/use-fetch-directors";
import useFetchGenres from "../../hooks/use-fetch-genres/use-fetch-genres";

const MovieView = ({ movies, token }) => {
    const { id } = useParams();
    const location = useLocation();
    const initialSelectedMovie = location.state ? location.state.selectedMovie : movies.find(movie => movie._id === id);
    const [selectedMovie, setSelectedMovie] = useState(initialSelectedMovie);
    const navigate = useNavigate();

    const directorIds = selectedMovie?.director_ids;
const allDirectors = useFetchDirectors(token);
    const allActors = useFetchActors(token);
    const allGenres = useFetchGenres(token);

    useEffect(() => {
        const updatedSelectedMovie = movies.find(movie => movie._id === id);
        setSelectedMovie(updatedSelectedMovie);
    }, [movies, id]);

    const directors = allDirectors.filter(director => selectedMovie?.director_ids.includes(director._id));
    const actors = allActors.filter(actor => selectedMovie?.actor_ids.includes(actor._id));
    const genres = allGenres.filter(genre => selectedMovie?.genre_ids.includes(genre._id));

    useEffect(() => {
        if (selectedMovie === null) {
            navigate(-1);
        }
    }, [selectedMovie, navigate]);

    if (!selectedMovie) return null;

	return (
		<div className="container mt-5 vh-100">
			<div className="row">
				<div className="col-12 col-md-6">
					<img
						src={selectedMovie.imageurl}
						className="img-fluid"
					/>
				</div>
				<div className="col-12 col-md-6">
					<h2 className="mt-3">{selectedMovie.title}</h2>
					<p>
						<strong>Description: </strong>
						{selectedMovie.description}
					</p>
					<p>
						<strong>Release: </strong>
						{new Date(selectedMovie.release).toLocaleDateString()}
					</p>
					<p>
						<strong>Featured: </strong>
						{selectedMovie.featured.toString()}
					</p>
					<p>
						<strong>Director(s): </strong>
					</p>
					<ul>
						{directors && directors.length > 0 ? (
							directors.map((director, index) => (
								<li key={index}>
									<Link to={`/director/${director._id}`}>{director.name}</Link>
								</li>
							))
						) : (
							<li>No directors found</li>
						)}
					</ul>
					<p>
						<strong>Starring:</strong>
					</p>
					<ul>
						{actors.map((actor, index) => (
							<li key={index}>
								<Link
									to={{
										pathname: `/actor/${actor._id}`,
										state: { selectedActor: actor },
									}}
								>
									{actor.name}
								</Link>
							</li>
						))}
					</ul>
					<p>
						<strong>Genres: </strong>
					</p>
					<ul>
						{genres.map((genre, index) => (
							<li key={index}>
								<Link to={`/genre/${genre._id}`}>{genre.name}</Link>
							</li>
						))}
					</ul>

					<button className="btn btn-secondary m-3">Edit</button>
					<button
						className="btn btn-secondary m-3"
						onClick={() => navigate(-1)}
					>
						Back
					</button>
				</div>
			</div>
		</div>
	);
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageurl: PropTypes.string,
        featured: PropTypes.bool,
        actor_ids: PropTypes.arrayOf(PropTypes.string),
        release: PropTypes.string,
        director_ids: PropTypes.arrayOf(PropTypes.string),
        genre_ids: PropTypes.arrayOf(PropTypes.string),
    })),
    token: PropTypes.string.isRequired,
};

export default MovieView;
