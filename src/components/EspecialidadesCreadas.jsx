import React, { useState, useEffect } from "react";
import service from "../services/service.config";


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
    {especialidadesUsuario.length === 0 ? (
      <p>Todavía no has publicado ninguna especialidad</p>
    ) : (
        especialidadesUsuario.map((especialidad) => (
        <div key={especialidad._id}>
          <p>
            {especialidad.especialidadNombre} 
            <br />
            <img src={especialidad.especialidadPic} width="150" style={{ borderRadius: "500px"}} />
          </p>
          <br />
        </div>
      ))
    )}
  </div>
  )
}

export default EspecialidadesCreadas