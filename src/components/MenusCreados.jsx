import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function MenusCreados() {

    const [menusUsuario, setMenusUsuario] = useState([]);
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/menu/menuCreado/myprofile");
      console.log(response.data);
      setMenusUsuario(response.data);

      const especialidadesResponse = await service.get("/user/myprofile");

      const platosNombresObj = {};
      const postresNombresObj = {};

      especialidadesResponse.data.forEach((especialidad) => {
        platosNombresObj[especialidad._id] = especialidad.especialidadNombre;
        postresNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });

      setPlatosNombres(platosNombresObj);
      setPostresNombres(postresNombresObj);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container style={{ marginTop: "30px" }}>
      <h3 className="text-center">Tus menús publicados</h3>
      <Link to="/menu/add-menu">
        <div className="text-center mb-3">
          <Button variant="outline-success">Crear nuevo menú</Button>
        </div>
      </Link>
      {menusUsuario.length === 0 ? (
        <p>No has creado ningún menú</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="justify-content-center">
          {menusUsuario.map((menu) => (
            <Col key={menu._id} className="mb-4">
              <Link to={`/menu/edit-menu/${menu._id}`} className="text-decoration-none">
                <Card className="h-100 custom-card">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className="text-center">
                      {platosNombres[menu.platoNombre]} y {postresNombres[menu.postreNombre]}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
  
  
        }

export default MenusCreados