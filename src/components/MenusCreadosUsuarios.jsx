import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';


function MenusCreadosUsuarios() {
    const { userId } = useParams();

  const [menusUsuario, setMenusUsuario] = useState([])
  const [platosNombres, setPlatosNombres] = useState({})
  const [postresNombres, setPostresNombres] = useState({})

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

const customWeekDayOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  return (
    <div>
    <h3>Menús publicados</h3>
    {menusUsuario.length === 0 ? (
      <p>Este usuario no ha publicado ningún menú</p>
    ) : (
      menusUsuario
      .sort((a, b) => {
          const dayAIndex = customWeekDayOrder.indexOf(a.weekDay);
          const dayBIndex = customWeekDayOrder.indexOf(b.weekDay);
          return dayAIndex - dayBIndex;
        })
      .map((menu) => (
        <div key={menu._id}>
          <p>{menu.weekDay}</p>
          <p>{platosNombres[menu.platoNombre]} y {postresNombres[menu.postreNombre]}</p>
          <br />
        </div>
      ))
    )}
  </div>
  )
}

export default MenusCreadosUsuarios