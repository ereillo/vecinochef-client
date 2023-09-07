import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";

function EspecialidadesList() {
  const [allEspecialidades, setAllEspecialidades] = useState();
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const especialidadesResponse = await service.get("/esp/especialidades");
      console.log(especialidadesResponse.data);
      setAllEspecialidades(especialidadesResponse.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const apuntarEspecialidad = async (especialidadId) => {
    console.log(especialidadId);
    try {
      const response = await service.post(
        `/esp/especialidades/apuntar/${especialidadId}`
      );
      console.log(response.data.message);

      getData();
    } catch (error) {
      console.error("Error al apuntarse a la especialidad", error);
    }
  };

  const desapuntarEspecialidad = async (especialidadId) => {
    try {
      const response = await service.post(
        `/esp/especialidades/desapuntar/${especialidadId}`
      );
      console.log(response.data.message);

      getData();
    } catch (error) {
      console.log("error al desapuntarte");
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
            <div>
              Vecinochef:
              <p key={eachEspecialidad.creador._id}>
                {eachEspecialidad.creador._id === activeUserId ? (
                  <p>{eachEspecialidad.creador.userName}</p>
                ) : (
                  <Link
                    to={`/user/user-profile/${eachEspecialidad.creador._id}`}
                  >
                    {eachEspecialidad.creador.userName}
                  </Link>
                )}
              </p>
            </div>
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
                  {eachParticipante._id === activeUserId ? (
                    <>{eachParticipante.userName}</>
                  ) : (
                    <Link to={`/user/user-profile/${eachParticipante._id}`}>
                      {eachParticipante.userName}
                    </Link>
                  )}
                </li>
              ))}
            </div>

            {eachEspecialidad.participantes.some(
              (participant) => participant._id === activeUserId
            ) ? (
              // Si el usuario está apuntado, muestra el botón de desapuntarse
              <Button
                variant="danger"
                onClick={() => desapuntarEspecialidad(eachEspecialidad._id)}
              >
                -
              </Button>
            ) : (
              // Si el usuario no está apuntado, muestra el botón de apuntarse
              <Button
                variant="success"
                onClick={() => apuntarEspecialidad(eachEspecialidad._id)}
              >
                +
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default EspecialidadesList;
