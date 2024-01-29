import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import xLogoWhite from '../../assets/x-logo-white.png';
import xLogoBlack from '../../assets/x-logo-black.png';
import linkedInLogo from '../../assets/LI-In-Bug.png';
import githubWhite from '../../assets/github-mark-white.svg';
import githubBlack from '../../assets/github-mark.svg';

const Footer = ({ darkMode }) => {
    return (
        <footer className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} text-center p-3`}>
            <Container className='w-50 w-md-25'>
                <Row className="justify-content-center">
                    <Col xs={12} className="text-center">
                        <p>Follow Me:</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={4} className="text-center">
                        <a href="https://www.linkedin.com/in/rory-van-blaricom/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedInLogo} alt="LinkedIn Logo" style={{width: 'auto', height: '30px'}} />
                        </a>
                    </Col>
                    <Col xs={4} className="text-center">
                        <a href="https://github.com/RoryV91" target="_blank" rel="noopener noreferrer">
                            <img src={darkMode ? githubWhite : githubBlack} alt="GitHub Logo" style={{width: 'auto', height: '30px'}} />
                        </a>
                    </Col>
                    <Col xs={4} className="text-center">
                        <a href="https://twitter.com/R0ry_V" target="_blank" rel="noopener noreferrer">
                            <img src={darkMode ? xLogoWhite : xLogoBlack} alt="X/Twitter Logo" style={{width: 'auto', height: '30px'}} />
                        </a>
                    </Col>
                </Row>
            </Container>
            <p className="m-3">🙏 Special thanks to <a href="https://www.careerfoundry.com" target="_blank" rel="noopener noreferrer">CareerFoundry</a>!</p>
            <p>Wanna learn how to do this too? Let me <a href="https://careerfoundry.com/en/referral_registrations/new?referral=xr1xnk7N" target="_blank" rel="noopener noreferrer">refer</a> you!</p>
            <p>&copy; {new Date().getFullYear()} Rory Van Blaricom</p>
        </footer>
    );
};

Footer.propTypes = {
    darkMode: PropTypes.bool.isRequired
};

export default Footer;