import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ActionButtons = ({ onDelete, onEdit, onBack }) => {
    return (
        <>
            <Button className="m-3" variant="danger" onClick={onDelete}>
                Delete ✂️
            </Button>
            <Button className="m-3" variant="warning" onClick={onEdit}>
                Edit 📝
            </Button>
            <Button className="m-3" variant="info" onClick={onBack}>
                Back ⏮️
            </Button>
        </>
    );
};

ActionButtons.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default ActionButtons;