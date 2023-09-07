import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function EspecialidadesCreadas() {
  const [especialidadesUsuario, setEspecialidadesUsuario] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/esp/espCreada/especialidades");
      console.log(response.data);
      setEspecialidadesUsuario(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3 style={{ marginBottom: "20px" }}>Tus especialidades</h3>
      <Link to="/esp/add-especialidad">
        <Button variant="outline-success" style={{ marginBottom: "25px" }}>
          Crear nuevo plato
        </Button>
      </Link>
      {especialidadesUsuario.length === 0 ? (
        <p>Todavía no has publicado ninguna especialidad</p>
      ) : (
        <Container fluid>
          <Row className="d-flex flex-wrap justify-content-center">
            {especialidadesUsuario.map((especialidad) => (
              <Col xs={12} sm={6} md={4} lg={3} key={especialidad._id}>
                <Card
                  style={{
                    width: "10rem",
                    height: "10rem", // Cartas más circulares
                    marginBottom: "20px",
                    borderRadius: "50%", // Cartas completamente redondas
                    overflow: "hidden", // Ocultar contenido que se desborde
                    position: "relative", // Para superponer el texto
                  }}
                  className="mx-auto text-center" // Centrar horizontalmente
                >
                  <Card.Img
                    variant="top"
                    src={especialidad.especialidadPic}
                    alt={especialidad.especialidadNombre}
                    style={{
                      width: "100%", // La imagen ocupa toda la carta
                      height: "100%", // La imagen ocupa toda la carta
                      objectFit: "cover", // Ajustar la imagen para que encaje
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.5)", // Fondo difuminado
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Link
                      to={`/esp/edit-especialidad/${especialidad._id}`}
                      style={{ fontSize: "14px", color: "white" }}
                    >
                      {especialidad.especialidadNombre}
                    </Link>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/esp/edit-especialidad/${especialidad._id}`}
                      style={{
                        fontSize: "12px",
                        marginTop: "8px",
                        width: "100px",
                      }}
                    >
                      Editar
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
  
  
  
}

export default EspecialidadesCreadas;
