import React from "react";
import { useState } from "react";
import MovieCard from "./movie-card";
import MovieView from "./movie-view";

const MainView = () => {
	const [movies, setMovies] = useState([
		{
			_id: 1,
			Title: "Good Burger",
			Description:
				"A dim-witted teenager and his new coworker try to save the old burger joint they work for from failing after the opening of a brand new burger restaurant across the street, which's planning to put them out of business.",
			ImagePath:
				"https://upload.wikimedia.org/wikipedia/en/c/c0/Good_Burger_film_poster.jpg",
		},
		{
			_id: 2,
			Title: "Apocalypse Now",
			Description: "A U.S. Army officer serving in Vietnam is tasked with assassinating a renegade Special Forces Colonel who sees himself as a god.",
			ImagePath:
				"https://upload.wikimedia.org/wikipedia/en/c/c2/Apocalypse_Now_poster.jpg",
		},
		{
			_id: 3,
			Title: "Office Space",
			Description: "Three company workers who hate their jobs decide to rebel against their greedy boss.",
			ImagePath:
				"https://upload.wikimedia.org/wikipedia/en/8/8e/Office_space_poster.jpg",
		},
	]);
    
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    if (selectedMovie) 
        return <MovieView selectedMovie={selectedMovie} />;

	if (movies.length === 0) {
		return <div>The list is empty!</div>;
	}

	return (
        <div>
            {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
            ))}
        </div>
	);
};

export default MainView;
