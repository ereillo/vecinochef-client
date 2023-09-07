import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function CustomNavbar() {
  const navigate = useNavigate();
  const { isUserActive, verifyToken } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    verifyToken(); // Verifica un token que no existe para reiniciar los estados
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container className="mx-auto d-flex justify-content-center">
        {isUserActive ? (
          <Navbar.Brand as={Link} to="/menu/home">
            Menús de la semana
          </Navbar.Brand>
        ) : null}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isUserActive ? (
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/esp/especialidades" activeClassName="active">
                Lista de especialidades
              </Nav.Link>
              <Nav.Link as={NavLink} to="/user/myprofile" activeClassName="active">
                Mi perfil
              </Nav.Link>
            </Nav>
          ) : null}
          {isUserActive ? (
            <Button variant="outline-danger" onClick={handleLogOut}>
              Cerrar sesión
            </Button>
          ) : (
            <Nav>
              <Nav.Link as={NavLink} to="/" activeClassName="active" exact>
                Main
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup" activeClassName="active">
                Registro
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login" activeClassName="active">
                Acceso
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;

