import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import MenusApuntado from "../components/MenusApuntado";


function MyProfile() {
  const [allEspecialidades, setAllEspecialidades] = useState();
  const [allMenus, setAllMenus] = useState(null);
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

  if (allMenus === null) {
    return <h3>...probando</h3>
  }

  return (
    <div>
      <Link to={`/user/edit-profile/${activeUserId}`}><button>Edita tu perfil</button></Link>
      {/* <AddEspecialidad getData={getData} setAllEspecialidades={setAllEspecialidades}/> */}
      <br />
      <hr />
      <div>
        <h3>Tus especialidades</h3>

          <Link to="/esp/add-especialidad"><button>Crear nuevo plato</button></Link>
        {allEspecialidades === undefined ? (
          <h3>... buscando</h3>
        ) : (
          allEspecialidades.map((eachEspecialidad) => (
            <div key={eachEspecialidad._id}>
              <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>
                {eachEspecialidad.especialidadNombre}
              </Link>
              <br />
              <img
                src={eachEspecialidad.especialidadPic}
                width="150"
                alt={eachEspecialidad.especialidadNombre}
              />
              <br />
              {/* <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>{eachEspecialidad.creador[0].userName}</Link> */}
            </div>
          ))
        )}
      </div>
      <hr />

      <div>
        <h3>Tus menús</h3>
        <Link to="/menu/add-menu">
          <button>Crear nuevo menú</button>
          </Link>
        {allMenus === undefined ? (
          <h3>... buscando</h3>
        ) : (
          allMenus.map((eachMenu) => (
            <div key={eachMenu._id}>
              <Link to={`/menu/edit-menu/${eachMenu._id}`}>
              {platosNombres[eachMenu.platoNombre]} y {postresNombres[eachMenu.postreNombre]}              </Link>
              <br />
            </div>
          ))
        )}
      </div>

      <div>
      <MenusApuntado
    allMenus={allMenus}
    platosNombres={platosNombres}
    postresNombres={postresNombres}
    userId={activeUserId} 
/>
</div>

      <div>
        <h3>Especialidades encargadas</h3>
      </div>
    </div>
  );
}

export default MyProfile;