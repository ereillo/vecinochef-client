import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";

function Home() {
  const [allEspecialidades, setAllEspecialidades] = useState();
  const [allMenus, setAllMenus] = useState([]);
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const especialidadesResponse = await service.get("/user/myprofile");
      console.log(especialidadesResponse.data);
      setAllEspecialidades(especialidadesResponse.data);

      const menusResponse = await service.get("/menu/home");
      console.log(menusResponse.data);
      setAllMenus(menusResponse.data);

      const platosNombresObj = {};
      especialidadesResponse.data.forEach((especialidad) => {
        platosNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPlatosNombres(platosNombresObj);

      const postresNombresObj = {};
      especialidadesResponse.data.forEach((especialidad) => {
        postresNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPostresNombres(postresNombresObj);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const apuntarMenu = async (menuId) => {
    try {
      const response = await service.post(`/menu/home/apuntar/${menuId}`);
      console.log(response.data.message);
      getData();
    } catch (error) {
      console.error("Error al apuntarse al menu", error);
    }
  };

  const desapuntarMenu = async (menuId) => {
    try {
      const response = await service.post(`/menu/home/desapuntar/${menuId}`);
      console.log(response.data.message);
      getData();
    } catch (error) {
      console.error("Error al apuntarse al menu", error);
    }
  };

  const customWeekDayOrder = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div>
      <h3>Lista de Menús</h3>
      {allMenus === undefined ? (
        <h3>... buscando</h3>
      ) : (
        allMenus
          .sort((a, b) => {
            const dayAIndex = customWeekDayOrder.indexOf(a.weekDay);
            const dayBIndex = customWeekDayOrder.indexOf(b.weekDay);
            return dayAIndex - dayBIndex;
          })
          .map((eachMenu) => (
            <div key={eachMenu._id}>
              <p>{eachMenu.weekDay}</p>

              <h3>
                {platosNombres[eachMenu.platoNombre]} y{" "}
                {postresNombres[eachMenu.postreNombre]}{" "}
              </h3>

              <p>{eachMenu.menuPrecio} €</p>


              <div>
                Vecinochef:
                <p key={eachMenu.creador._id}>
                  {eachMenu.creador._id === activeUserId ? (
                    <p>{eachMenu.creador.userName}</p>
                  ) : (
                    <Link to={`/user/user-profile/${eachMenu.creador._id}`}>
                      {eachMenu.creador.userName}
                    </Link>
                  )}
                </p>
              </div>

              <br />
              <div>
                Vecinos apuntados:
                {eachMenu.participantes.map((eachParticipante) => (
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
              {eachMenu.participantes.some(
                (participant) => participant._id === activeUserId
              ) ? (
                <div>
                  <Button
                    variant="danger"
                    onClick={() => desapuntarMenu(eachMenu._id)}
                  >
                    -
                  </Button>{" "}
                </div>
              ) : (
                <div>
                  <Button
                    variant="success"
                    onClick={() => apuntarMenu(eachMenu._id)}
                  >
                    +
                  </Button>{" "}
                </div>
              )}
            </div>
          ))
      )}
    </div>
  );
}

export default Home;
