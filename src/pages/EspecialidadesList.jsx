import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context"
import axios from "axios"

function EspecialidadesList() {

  const [allEspecialidades, setAllEspecialidades] = useState()
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {

    getData()

  }, [])

  const getData = async () => {

    try {
      const especialidadesResponse = await service.get("/user/myprofile");
      console.log(especialidadesResponse.data);
      setAllEspecialidades(especialidadesResponse.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }

  const apuntarEspecialidad = async (especialidadId) => {
    try {

      const response = await axios.post(`/esp/especialidades/${especialidadId}`);
      console.log(response.data.message); 

      getData();
    } catch (error) {
      console.error("Error al apuntarse a la especialidad", error);
    }
  };
  return (
      <div>
        <h3>Lista de Especialidades</h3>
        {allEspecialidades === undefined ? (
          <h3>... buscando</h3>
        ) : (
          allEspecialidades.map((eachEspecialidad) => (
            <div key={eachEspecialidad._id}>
                {eachEspecialidad.especialidadNombre}
              <br />
              <img src={eachEspecialidad.especialidadPic} width="150" alt={eachEspecialidad.especialidadNombre} />
              <br />
              <p>{eachEspecialidad.especialidadPrecio}</p>
              {/* <Link to={`/user/user-profile/${eachEspecialidad.creador}`}>{eachEspecialidad.creador}</Link> */}
              <br />
              <button onClick={() => apuntarEspecialidad(eachEspecialidad._id)}>
                Apuntarse a la especialidad
              </button>
            </div>
          ))
        )}
      </div>
  );
}

export default EspecialidadesList