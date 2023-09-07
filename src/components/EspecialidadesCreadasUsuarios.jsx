import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EspecialidadesCreadasUsuarios() {
    const { userId } = useParams();
  const [especialidadesUsuario, setEspecialidadesUsuario] = useState([]);

  useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId]);

  const getData = async (userId) => {
    try {
      const response = await service.get(
        `/esp/espCreada/especialidades/${userId}`
      );
      console.log(response.data + "ESTE CONSOLE");
  
      const especialidadesFiltradas = response.data.filter(
        (especialidad) => especialidad.isEspecialidad === true
      );
  
      setEspecialidadesUsuario(especialidadesFiltradas);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <h3 style={{ marginBottom: "10px", marginTop: "20px" }}>Estas son sus especialidades</h3>
      {especialidadesUsuario.length === 0 ? (
        <p>Este usuario no tiene ninguna especialidad publicada</p>
      ) : (
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="justify-content-center">
            {especialidadesUsuario.map((especialidad) => (
              <Col key={especialidad._id} style={{ marginBottom: "20px" }}>
                <Card
                  style={{
                    width: "8rem",
                    height: "8rem", 
                    marginBottom: "0px",
                    marginTop: "10px",
                    borderRadius: "50%", 
                    overflow: "hidden", 
                    position: "relative",
                  }}
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
                      color: "white",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Sombreado
                    }}
                  >
                    <p
                      to={`/esp/edit-especialidad/${especialidad._id}`}
                      style={{ fontSize: "16px", fontWeight: "bold" }} // Fuente más grande y negrita
                    >
                      {especialidad.especialidadNombre}
                    </p>
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

export default EspecialidadesCreadasUsuarios;
