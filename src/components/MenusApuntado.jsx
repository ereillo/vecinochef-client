import React, { useState, useEffect } from "react";
import service from "../services/service.config";

function MenusApuntado() {
  const [menusUsuario, setMenusUsuario] = useState([]);
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/menu/menuApuntado/myprofile");
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
    <div class= "bodycomponentes">
      <h3>Menús a los que estás apuntado</h3>
      {menusUsuario.length === 0 ? (
        <p>No estás apuntado a ningún menú</p>
      ) : (
        menusUsuario.map((menu) => (
          <div key={menu._id}>
            <li>
            {menu.weekDay}: {platosNombres[menu.platoNombre]} y {postresNombres[menu.postreNombre]} 
            </li>
            <br />
          </div>
        ))
      )}
    </div>
  );
}

export default MenusApuntado;