import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
      <h3>Especialidades publicadas</h3>
      {especialidadesUsuario.length === 0 ? (
        <p>Este usuario no tiene ninguna especialidad publicada</p>
      ) : (
        especialidadesUsuario.map((especialidad) => (
          <div key={especialidad._id}>
            {especialidad.especialidadNombre}
            <br />
            <img
              src={especialidad.especialidadPic}
              width="150"
              style={{ borderRadius: "500px" }}
            />
            <br />
            <p>{especialidad.especialidadIngredientes}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default EspecialidadesCreadasUsuarios;
