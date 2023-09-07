import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { useParams } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';

function MenusCreadosUsuarios() {
  const { userId } = useParams();

  const [menusUsuario, setMenusUsuario] = useState([]);
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});

  useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId]);

  const getData = async (userId) => {
    try {
      const response = await service.get(`menu/menuCreado/menu/${userId}`);
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

  const customWeekDayOrder = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
      <h3>Menús publicados</h3>
      {menusUsuario.length === 0 ? (
        <p>Este usuario no ha publicado ningún menú</p>
      ) : (
        <div className="d-flex flex-column align-items-center">
          {menusUsuario
            .sort((a, b) => {
              const dayAIndex = customWeekDayOrder.indexOf(a.weekDay);
              const dayBIndex = customWeekDayOrder.indexOf(b.weekDay);
              return dayAIndex - dayBIndex;
            })
            .map((menu) => (
              <div key={menu._id} style={{ marginBottom: '20px' }}>
                <Card style={{ width: '18rem', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
                  <Card.Body>
                    <Card.Title>
                      {platosNombres[menu.platoNombre]} y {postresNombres[menu.postreNombre]}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted small">
                      <span className="weekday">{menu.weekDay}</span>
                    </Card.Subtitle>
                    {/* Resto de contenido del menú */}
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      )}
    </div>
  );
  
}

export default MenusCreadosUsuarios;

