import React, { useState } from 'react';

const EditMovieView = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Implement the logic to update the movie with the new values
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <br />
            <label>
                Genre:
                <input type="text" value={genre} onChange={handleGenreChange} />
            </label>
            <br />
            <label>
                Description:
                <textarea value={description} onChange={handleDescriptionChange} />
            </label>
            <br />
            <button type="submit">Save</button>
        </form>
    );
};

export default EditMovieView;
