import React, { useState, useEffect } from "react";
import service from "../services/service.config";

function EspecialidadApuntadas() {
  const [especialidadesUsuario, setEspecialidadesUsuario] = useState([]);
 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get("/esp//espApuntada/especialidades");
      console.log(response.data);
      setEspecialidadesUsuario(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <h3>Especialidades que has encargado</h3>
    {especialidadesUsuario.length === 0 ? (
      <p>No tienes ninguna especialidad encargada</p>
    ) : (
        especialidadesUsuario.map((especialidad) => (
        <div key={especialidad._id}>
          <li>
            {especialidad.especialidadNombre}
          </li>
          <br />
        </div>
      ))
    )}
  </div>
  )
}

export default EspecialidadApuntadas