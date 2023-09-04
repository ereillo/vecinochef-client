import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context"
import axios from "axios"

function MyProfile() {

  const [allEspecialidades, setAllEspecialidades] = useState()
  const [allMenus, setAllMenus] = useState()
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

      const menusResponse = await service.get("/menu/myprofile");
      console.log(menusResponse.data);
      setAllMenus(menusResponse.data);
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
      <Link to={`/user/edit-profile/${activeUserId}`}>Edita tu perfil</Link>
      {/* <AddEspecialidad getData={getData} setAllEspecialidades={setAllEspecialidades}/> */}
      <br />
      <hr />
      <div>
        <h3>Lista de Especialidades</h3>
        {allEspecialidades === undefined ? (
          <h3>... buscando</h3>
        ) : (
          allEspecialidades.map((eachEspecialidad) => (
            <div key={eachEspecialidad._id}>
              <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>
                {eachEspecialidad.especialidadNombre}
              </Link>
              <br />
              <img src={eachEspecialidad.especialidadPic} width="150" alt={eachEspecialidad.especialidadNombre} />
              <br />
              {/* <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>{eachEspecialidad.creador[0].userName}</Link> */}
            </div>
          ))
        )}
      </div>
      <hr />
      <div>
        <h3>Lista de Menús</h3>
        {allMenus === undefined ? (
          <h3>... buscando</h3>
        ) : (
          allMenus.map((eachMenu) => (
            <div key={eachMenu._id}>
              <Link to={`/esp/edit-menu/${eachMenu._id}`}>
                {eachMenu.platoNombre.platoNombre}
              </Link>
              <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
  }

export default MyProfile