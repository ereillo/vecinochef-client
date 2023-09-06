import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


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
    <div>
    <h3>Menús creados por ti</h3>
    <Link to="/menu/add-menu">
          <div>
        <Button variant="outline-success">Crear nuevo menú</Button>
        </div>
          </Link>
    {menusUsuario.length === 0 ? (
      <p>No has creado ningún menú</p>
    ) : (
      menusUsuario.map((menu) => (
        <div key={menu._id}>
         <Link to={`/menu/edit-menu/${menu._id}`}>
          {platosNombres[menu.platoNombre]} y {postresNombres[menu.postreNombre]}
          </Link>
          <br />
        </div>
      ))
    )}
  </div>
  )
}

export default MenusCreados