import { useContext, useEffect, useState } from "react";
import AddEspecialidad from "../pages/AddEspecialidad";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context"

function Home() {

  const [allEspecialidades, setAllEspecialidades] = useState();
  const [allMenus, setAllMenus] = useState();
  const [platosNombres, setPlatosNombres] = useState({})
  const [postresNombres, setPostresNombres] = useState({})
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

      const menusResponse = await service.get("/menu/myprofile");
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
  }

  const apuntarMenu = async (menuId) => {
    try {
      const response = await service.post(`/menu/home/${menuId}`);
      console.log(response.data.message);
      getData();
    } catch (error) {
      console.error("Error al apuntarse al menu", error);
    }
  };

  return (
    <div>
        <h3>Lista de Menús</h3>
        {allMenus === undefined ? (
          <h3>... buscando</h3>
        ) : (
          allMenus.map((eachMenu) => (
            <div key={eachMenu._id}>
              <Link to={`/menu/edit-menu/${eachMenu._id}`}>
                <p>{eachMenu.weekDay}</p>
              {platosNombres[eachMenu.platoNombre]} y {postresNombres[eachMenu.postreNombre]}              </Link>
              <br />
              <button onClick={() => apuntarMenu(eachMenu._id)}>
          Apuntarse al menú
        </button>
            </div>
          ))
        )}
      </div>
  )
}

export default Home