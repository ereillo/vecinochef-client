import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


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
      <h3>Tus especialidades</h3>
      <Link to="/esp/add-especialidad"><Button variant="outline-success">Crear nuevo plato</Button></Link>
      {especialidadesUsuario.length === 0 ? (
        <p>Todavía no has publicado ninguna especialidad</p>
      ) : (
        especialidadesUsuario.map((especialidad) => (
          <div key={especialidad._id}>
            <Link to={`/esp/edit-especialidad/${especialidad._id}`}>
              {especialidad.especialidadNombre}
              <br />
              <img
                src={especialidad.especialidadPic}
                width="150"
                style={{ borderRadius: "500px" }}
              />
            </Link>
            <br />
          </div>
        ))
      )}
    </div>
  );
}

export default EspecialidadesCreadas;
