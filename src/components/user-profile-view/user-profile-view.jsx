import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';

function UserProfileView({ token, user }) {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    console.log(user);
    
    useEffect(() => {
        axios.get(`/users/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            const updatedUser = response.data;

            const favMovies = updatedUser.user_movie_ids.map(movieId => {
                return axios.get(`/movies/${movieId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            });

            Promise.all(favMovies)
                .then(response => {
                    setFavoriteMovies(response.map(res => res.data));
                });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }, []);

    return (
        <div>
            <h1>Profile View</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Date of Birth: {new Date(user?.dob)?.toLocaleDateString()}</p>
            <Link to={`/users/${user._id}/update`}>Update Profile</Link>
            <Link to={`/users/${user._id}/deregister`}>Deregister</Link>
            <h2>Favorite Movies</h2>
            {favoriteMovies?.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
            ))}
        </div>
    );
}

export default UserProfileView;