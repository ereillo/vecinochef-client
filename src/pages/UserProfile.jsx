import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import EspecialidadesCreadasUsuarios from "../components/EspecialidadesCreadasUsuarios";
import MenusCreadosUsuarios from "../components/MenusCreadosUsuarios";

function UserProfile() {
  const { userId } = useParams();
  const [allEspecialidades, setAllEspecialidades] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});
  const [userData, setUserData] = useState({})




  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId]);

  const getData = async (userId) => {
    console.log(userId);
    try {
      const response = await service.get(`/user/user-profile/${userId}`);
      console.log(response.data);
      setAllEspecialidades(response.data.especialidades);
      setAllMenus(response.data.menu);
      setUserData(response.data.user);

      const platosNombresObj = {};
      response.data.especialidades.forEach((especialidad) => {
        platosNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPlatosNombres(platosNombresObj);

      const postresNombresObj = {};
      response.data.menu.forEach((especialidad) => {
        postresNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPostresNombres(postresNombresObj);
      setPostresNombres(postresNombresObj);
    

    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <hr />
    <h2>Página de perfil de {userData.userName} {userData.userSurname}</h2> 
    <br />
    <img src={userData.profilePic} width="150"
          alt=""
          style={{ borderRadius: "500px" }}/>
      <EspecialidadesCreadasUsuarios/>
      <br />
      <hr />
      <MenusCreadosUsuarios/>
    </div>
  );


}

export default UserProfile;
