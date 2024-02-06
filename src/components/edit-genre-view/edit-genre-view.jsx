import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const EditGenreView = ({ token, onEdit, darkMode, updateGenre }) => {
    const { id } = useParams();
    const [genre, setGenre] = useState(null);
    const [isLoading, setIsLoading] = useState(!genre);
    const [error, setError] = useState(null);
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setGenre(response.data);
            setValue("name", response.data.name);
            setValue("description", response.data.description);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, [id, setValue, token]);

    const onSubmit = (data) => {
        axios.put(`/genres/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            onEdit(response.data);
            navigate(-1);
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const onDelete = () => {
        axios.delete(`/genres/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            navigate(-1);
        })
        .catch(error => {
            setError(error.message);
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>📚 Genre Name</Form.Label>
                        <Form.Control {...register("name")} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>📰 Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            {...register("description")}
                        />
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
    token: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    updateGenre: PropTypes.func.isRequired,
};

export default EditGenreView;