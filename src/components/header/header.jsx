import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import {
	Navbar,
	Nav,
	Button,
	Dropdown,
	DropdownButton,
	Form,
} from "react-bootstrap";

const Header = ({ handleLogout, darkMode, setDarkMode, user }) => {
const navigate = useNavigate();
    const navItems = [
		{ title: "Movies", view: "#movies/view", add: "#movies/add" },
		{ title: "Genres", view: "#genres/view", add: "#genres/add" },
		{ title: "Directors", view: "#directors/view", add: "#directors/add" },
		{ title: "Actors", view: "#actors/view", add: "#actors/add" },
	];
    const handleUserLogout = () => {
        handleLogout();
        navigate('/login');
    };
return (
    <Navbar
        className={
            darkMode
                ? "border-bottom bg-dark text-light border-5 px-3"
                : "border-bottom bg-light text-dark border-5 px-3"
        }
        expand="lg"
        fixed="top"
    >
        <Navbar.Brand
            className={`${darkMode ? "text-light" : "text-dark"}`}
            href="#home"
        >
            myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-around align-items-center">
                {!user ? (
                    <>
                        <Button variant={darkMode ? "dark" : "light"} href="/login">Log In</Button>
                        <Button variant={darkMode ? "dark" : "light"} href="/signup">Sign Up</Button>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={darkMode ? "☀️" : "🌙"}
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="mr-2 cursor-pointer"
                        />
                    </>
                ) : (
                    <>
                        {navItems.map((item, index) => (
                            <DropdownButton
                                key={index}
                                id={`dropdown-basic-button-${index}`}
                                title={item.title}
                                variant={darkMode ? "dark" : "light"}
                                className={`p-0 m-0 bg-transparent border-0 ${
                                    darkMode ? "text-light" : "text-dark"
                                }`}
                                menuVariant={darkMode ? "dark" : "light"}
                            >
                                <Dropdown.Item href={item.view}>View</Dropdown.Item>
                                <Dropdown.Item href={item.add}>Add...</Dropdown.Item>
                            </DropdownButton>
                        ))}
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label={darkMode ? "☀️" : "🌙"}
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="mr-2 cursor-pointer"
                        />
                        <Button
                            variant="danger"
                            onClick={handleUserLogout}
                            className="ml-2"
                        >
                            Logout
                        </Button>
                    </>
                )}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

Header.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
      email: PropTypes.string,
      birthday: PropTypes.string,
    }).isRequired,
  };

};



export default Header;
