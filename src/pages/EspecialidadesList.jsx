import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context"

function EspecialidadesList() {

  const [allEspecialidades, setAllEspecialidades] = useState()
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate()
  

  useEffect(() => {

    getData()

  }, [])

  const getData = async () => {

    try {
      const especialidadesResponse = await service.get("/esp/especialidades");
      console.log(especialidadesResponse.data);
      setAllEspecialidades(especialidadesResponse.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }

  const apuntarEspecialidad = async (especialidadId) => {
    console.log(especialidadId)
    try {

      const response = await service.post(`/esp/especialidades/${especialidadId}`);
      console.log(response.data.message); 

      getData();
    } catch (error) {
      console.error("Error al apuntarse a la especialidad", error);
    }
  };

  return (
    <div>
  <h3>Lista de Especialidades</h3>
  <hr />
  {allEspecialidades === undefined ? (
    <h3>... buscando</h3>
  ) : (
    allEspecialidades.map((eachEspecialidad) => (
      <div key={eachEspecialidad._id} style={{ margin: "50px" }}>
        {eachEspecialidad.especialidadNombre}
        <br />
        <Link to={`/user/user-profile/${eachEspecialidad.creador._id}`}>
          Vecinochef: {eachEspecialidad.creador.userName}
        </Link>
        <br />
        <img
          src={eachEspecialidad.especialidadPic}
          width="150"
          alt={eachEspecialidad.especialidadNombre}
          style={{ borderRadius: "500px" }}
        />
        <br />
        <p>Precio: {eachEspecialidad.especialidadPrecio}€</p>

        <div>
          Vecinos apuntados:
          
            {eachEspecialidad.participantes.map((eachParticipante) => (
              <li key={eachParticipante._id}>
                <Link to={`/user/user-profile/${eachParticipante._id}`}>
                  {eachParticipante.userName}
                </Link>
              </li>
            ))}
          
        </div>

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