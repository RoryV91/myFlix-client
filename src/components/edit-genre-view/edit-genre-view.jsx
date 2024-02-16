import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const EditGenreView = ({ genres, token, updateGenre, deleteGenre }) => {
    const { id } = useParams();
    const [genre, setGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (genres) {
            const foundGenre = genres.find((genre) => genre._id === id);
            if (foundGenre) {
                setValue("name", foundGenre.name);
                setValue("description", foundGenre.description);
                setGenre(foundGenre);
                console.log(foundGenre);
            }
        }
        
        setIsLoading(false);
    }, [genres, setValue, id]);

    const onSubmit = (data) => {
        axios.put(`https://myflixapi.vanblaricom.dev:9999/genres/${genre._id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const updatedGenre = response.data;
            alert("Genre updated successfully");
            navigate(`/genre/${genre._id}`);
            updateGenre(updatedGenre);
        })
        .catch(error => {
            console.log(error);
            alert("An error occurred while updating the genre");
        });
    };

    const onDelete = () => {
        if (window.confirm("Are you sure you want to delete this genre? This action cannot be undone.")) {
            axios
                .delete(`https://myflixapi.vanblaricom.dev:9999/genres/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    if (response.status === 200) {
                        alert("Genre deleted successfully");

                        deleteGenre(id);
                    } else {
                        alert("Failed to delete genre");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting genre", error);
                    alert("Failed to delete genre: " + error.message);
                })
                .finally(() => {
                    navigate('/genres/view');
                });
        }
    };

    if (isLoading) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div className="progress w-50">
					<div className="indeterminate"></div>
				</div>
			</div>
		);
	}

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={6}>
                <Form.Group className="mb-3">
                        <Form.Label>📚 Genre Name</Form.Label>
                        <Form.Control {...register("name", { required: true })} />
                        {errors.name && <p>This field is required</p>}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>📰 Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            {...register("description", { required: true })}
                        />
                        {errors.description && <p>This field is required</p>}
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col
                    xs={12}
                    md={4}
                    className="mb-3 mb-md-0 text-center"
                >
                    <Button
                        variant="danger"
                        type="button"
                        onClick={onDelete}
                        className="w-100"
                    >
                        Delete Genre 🗑️
                    </Button>
                </Col>
                <Col
                    xs={12}
                    md={4}
                    className="mb-3 mb-md-0 text-center"
                >
                    <Button
                        variant="info"
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-100"
                    >
                        Back ⏮️
                    </Button>
                </Col>
                <Col
                    xs={12}
                    md={4}
                    className="text-md-end"
                >
                    <Button
                        variant="success"
                        type="submit"
                        className="w-100"
                    >
                        Save Changes 💾
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

EditGenreView.propTypes = {
    genres: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    token: PropTypes.string.isRequired,
    updateGenre: PropTypes.func.isRequired,
    deleteGenre: PropTypes.func.isRequired,
};

export default EditGenreView;