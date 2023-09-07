import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import MenusApuntado from "../components/MenusApuntado";
import Button from 'react-bootstrap/Button';
import EspecialidadApuntadas from "../components/EspecialidadApuntadas";
import EspecialidadesCreadas from "../components/EspecialidadesCreadas";
import MenusCreados from "../components/MenusCreados";



function MyProfile() {
  const [allEspecialidades, setAllEspecialidades] = useState();
  const [allMenus, setAllMenus] = useState(null);
  const [platosNombres, setPlatosNombres] = useState({})
  const [postresNombres, setPostresNombres] = useState({})
  const { activeUserId, activeUserName } = useContext(AuthContext);
  const [userData, setUserData] = useState({})

  
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
    <div class= "bodycomponentes" style = {{marginTop: "50px", marginTop: "30px" }}>
      <h2 style={{ marginBottom: "30px" }}>Tu página de perfil</h2>
      <Link to={`/user/edit-profile/${activeUserId}`}>
        <div>
          <Button variant="outline-primary" style={{ width: "100px" }}>
            Edita tu perfil
          </Button>{' '}
        </div>
      </Link>
      <br />
      <hr />
      <EspecialidadesCreadas />
      <hr />
      <br />
      <MenusCreados />
      <hr />
      <br />
      <MenusApuntado />
      <hr />
      <br />
      <EspecialidadApuntadas />
    </div>
  );

}

export default MyProfile;