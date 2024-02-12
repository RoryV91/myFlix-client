import { useState, useEffect } from "react";

const useFetchDirectors = (token) => {
    const [directors, setDirectors] = useState([]);
    
    useEffect(() => {
        if (!token) return;

        fetch("https://myflixapi.vanblaricom.dev:9999/directors", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
            setDirectors(data)
            console.log('Fetched directors:', directors);})
            .catch((error) => console.error("Error fetching directors:", error));
    }, [token]);

    return [directors, setDirectors] 
};

export default useFetchDirectors;