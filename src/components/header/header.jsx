import React from 'react';
import { Navbar, Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';

const Header = ({ handleLogout }) => {
    return (
        <Navbar className="border-bottom">
            <Navbar.Brand href="#home">myFlix</Navbar.Brand>
            <Nav className="mr-auto">
                <DropdownButton id="dropdown-basic-button" title="Movies" variant="transparent" className="text-dark p-0 m-0 bg-transparent border-0">
                    <Dropdown.Item href="#movies/view">View</Dropdown.Item>
                    <Dropdown.Item href="#movies/add">Add...</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-basic-button" title="Genres" variant="transparent" className="text-dark p-0 m-0 bg-transparent border-0">
                    <Dropdown.Item href="#genres/view">View</Dropdown.Item>
                    <Dropdown.Item href="#genres/add">Add...</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-basic-button" title="Directors" variant="transparent" className="text-dark p-0 m-0 bg-transparent border-0">
                    <Dropdown.Item href="#directors/view">View</Dropdown.Item>
                    <Dropdown.Item href="#directors/add">Add...</Dropdown.Item>
                </DropdownButton>

                <DropdownButton id="dropdown-basic-button" title="Actors" variant="transparent" className="text-dark p-0 m-0 bg-transparent border-0">
                    <Dropdown.Item href="#actors/view">View</Dropdown.Item>
                    <Dropdown.Item href="#actors/add">Add...</Dropdown.Item>
                </DropdownButton>
            </Nav>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Navbar>
    );
};

export default Header;