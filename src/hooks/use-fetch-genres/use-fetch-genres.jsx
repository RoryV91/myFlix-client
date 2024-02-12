import { useState, useEffect } from "react";

const useFetchGenres = (token) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        if (!token) return;

        fetch("https://myflixapi.vanblaricom.dev:9999/genres", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched genres:', data); // Log the fetched data
                setGenres(data);
            })
            .catch((error) => console.error("Error fetching genres:", error));
    }, [token]);

    return [genres, setGenres];
};

export default useFetchGenres;