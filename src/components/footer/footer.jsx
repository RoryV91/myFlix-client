import React from 'react';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center' }}>
            <p>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> | 
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">X</a>
            </p>
            <p>Special thanks to CareerFoundry</p>
            <p>&copy; {new Date().getFullYear()} Your Name</p>
        </footer>
    );
};

export default Footer;