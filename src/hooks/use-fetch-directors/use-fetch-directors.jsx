// useFetchDirectors.js
import { useState, useEffect } from "react";

const useFetchDirectors = (directorIds, token) => {
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        if (!directorIds || !token) return;

        const fetchDirectors = async () => {
            const fetchedDirectors = await Promise.all(
                directorIds.map((id) =>
                    fetch(`https://myflixapi.vanblaricom.dev:9999/directors/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((response) => response.json())
                )
            );

            setDirectors(fetchedDirectors);
        };

        fetchDirectors();
    }, [directorIds, token]);

    return directors;
};

export default useFetchDirectors;