import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewGenreView = ({ addGenre, token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newGenre = { name, description };

        const response = await fetch('https://myflixapi.vanblaricom.dev:9999/genres/new', {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newGenre)
        });

        if (!response.ok) {
            const message = await response.text();
            alert(`Failed to add genre: ${message}`);
            return;
        }

        const addedGenre = await response.json();
        addGenre(addedGenre);
        alert('Genre added successfully!');
        navigate("/genres/view");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="name">
                        <Form.Label>🏷️ Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="description">
                        <Form.Label>📰 Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col
                    xs={12}
                    sm={6}
                    className="mb-2 mb-sm-0"
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
                    sm={6}
                >
                    <Button
                        variant="success"
                        type="submit"
                        className="w-100"
                    >
                        Add ➕
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default NewGenreView;