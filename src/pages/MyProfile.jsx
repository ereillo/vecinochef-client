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
      <Link to={`/user/edit-profile/${activeUserId}`}>
        <div>
        <Button variant="outline-primary"style={{width: "100px"}}>Edita tu perfil</Button>{' '}
        </div>
      </Link>
      <br />
      <Link to="/esp/add-especialidad"><Button variant="outline-success">Crear nuevo plato</Button></Link>
      <Link to="/menu/add-menu">
          <div>
        <Button variant="outline-success" style={{width: "100px"}}>Crear nuevo menú</Button>
        </div>
          </Link>
      <hr />
      <EspecialidadesCreadas/>
      <hr />
      <br />
      <MenusCreados/>
      <hr />
      <br />
      <MenusApuntado/>
      <hr />
      <br />
        <EspecialidadApuntadas/>
    </div>
  );
}

export default MyProfile;