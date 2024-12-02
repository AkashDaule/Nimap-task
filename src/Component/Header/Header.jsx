import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("/");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleNavClick = (path) => {
    setActiveNav(path); 
    navigate(path); 
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-dark bg-dark full-width-navbar sticky-top">
        <Container className="content-container">
          <Navbar.Brand href="/">MovieDb</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Item
                className="nav-item"
                onClick={() => handleNavClick("/")}
              >
                <span className={`nav-link ${activeNav === "/" ? "active" : ""}`}>
                  Home
                </span>
              </Nav.Item>
              <Nav.Item
                className="nav-item"
                onClick={() => handleNavClick("/top-rated")}
              >
                <span className={`nav-link ${activeNav === "/top-rated" ? "active" : ""}`}>
                  Top Rated
                </span>
              </Nav.Item>
              <Nav.Item
                className="nav-item"
                onClick={() => handleNavClick("/upcoming")}
              >
                <span className={`nav-link ${activeNav === "/upcoming" ? "active" : ""}`}>
                  Upcoming
                </span>
              </Nav.Item>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Movie Name"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                style={{
                  borderColor: "white",
                  backgroundColor: "#f8f9fa",
                  color: "black",
                }}
                variant="outline-success"
                type="submit"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
