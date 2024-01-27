// useFetchActors.js
import { useState, useEffect } from "react";

const useFetchActors = (token) => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        if (!token) return;

        fetch("https://myflixapi.vanblaricom.dev:9999/actors", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => setActors(data))
            .catch((error) => console.error("Error fetching actors:", error));
    }, [token]);

    return actors;
};

export default useFetchActors;