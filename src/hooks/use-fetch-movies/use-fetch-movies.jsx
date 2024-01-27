// useFetchMovies.js
import { useState, useEffect } from "react";

const useFetchMovies = (token) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!token) return;

        fetch("https://myflixapi.vanblaricom.dev:9999/movies", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error("Error fetching movies:", error));
    }, [token]);

    return movies;
};

export default useFetchMovies;