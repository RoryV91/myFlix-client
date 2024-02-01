import React from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import {
	Navbar,
	Nav,
	Button,
	Dropdown,
	Form,
} from "react-bootstrap";

const Header = ({ handleLogout, darkMode, setDarkMode, user }) => {
	const navigate = useNavigate();
	const navItems = [
		{ title: "Movies", view: "movies/view", add: "movies/add" },
		{ title: "Genres", view: "genres/view", add: "genres/add" },
		{ title: "Directors", view: "directors/view", add: "directors/add" },
		{ title: "Actors", view: "actors/view", add: "actors/add" },
		{ title: "Profile", view: `profile/view/${user._id}`, edit: `profile/edit/${user._id}` },
	];
	const handleUserLogout = () => {
		handleLogout();
		navigate("/login");
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
				href="/"
			>
				<span className="spin">📼</span> myFlix
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" className={`${darkMode ? "navbar-dark" : "navbar-light"}`}/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="w-100 d-flex justify-content-around align-items-center">
					{!user ? (
						<>
							<Button
								variant={darkMode ? "dark" : "light"}
								href="/login"
							>
								Log In
							</Button>
							<Button
								variant={darkMode ? "dark" : "light"}
								href="/signup"
							>
								Sign Up
							</Button>
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
								<Dropdown key={index}>
									<Dropdown.Toggle
										variant={darkMode ? "dark" : "light"}
										id={`dropdown-basic-button-${index}`}
									>
										{item.title}
									</Dropdown.Toggle>
									<Dropdown.Menu
										className={darkMode ? "dropdown-menu-dark" : ""}
									>
										<Dropdown.Item
											as={Link}
											to={item.view}
										>
											View
										</Dropdown.Item>
										{item.title !== 'Profile' && item.add && (
											<Dropdown.Item
												as={Link}
												to={item.add}
											>
												Add...
											</Dropdown.Item>
										)}
										{item.title === 'Profile' && item.edit && (
											<Dropdown.Item
												as={Link}
												to={item.edit}
											>
												Edit...
											</Dropdown.Item>
										)}
									</Dropdown.Menu>
								</Dropdown>
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
								Logout 🔐
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
