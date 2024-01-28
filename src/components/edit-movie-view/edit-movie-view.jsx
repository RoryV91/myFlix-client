import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const EditMovieView = ({ movies, token, onEdit }) => {
    const { id } = useParams();
    const movie = movies ? movies.find(movie => movie._id === id) : null;

    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (movie) {
            setValue("title", movie.title);
            setValue("description", movie.description);
            setValue("genres", movie.genre_ids.join(", "));
            setValue("directors", movie.director_ids.join(", "));
            setValue("actors", movie.actor_ids.join(", "));
            setValue("imageurl", movie.imageurl);
            setValue("featured", movie.featured);
            setValue("release", movie.release);
        }
    }, [movie, setValue]);

    const onSubmit = (data) => {
        onEdit({
            ...movie,
            ...data
        });

        navigate(-1);
    };


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control {...register("title")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control {...register("description")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Genres</Form.Label>
                <Form.Control {...register("genres")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Director(s)</Form.Label>
                <Form.Control {...register("directors")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Actors</Form.Label>
                <Form.Control {...register("actors")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control {...register("imageurl")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Featured</Form.Label>
                <Form.Check {...register("featured")} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Release</Form.Label>
                <Form.Control {...register("release")} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Discard Changes
            </Button>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    );
};

export default EditMovieView;