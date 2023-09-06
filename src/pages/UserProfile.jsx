import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../services/service.config";

function UserProfile() {
  const { userId } = useParams() 
  const [allEspecialidades, setAllEspecialidades] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId]);

  const getData = async (userId) => {

    console.log(userId)
    try {
      const response = await service.get(`/user/user-profile/${userId}`);
      console.log(response.data);
      setAllEspecialidades(response.data.especialidades);
      setAllMenus(response.data.menu);

      const platosNombresObj = {};
      response.data.especialidades.forEach((especialidad) => {
        platosNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPlatosNombres(platosNombresObj);

      const postresNombresObj = {};
      response.data.forEach((especialidad) => {
        postresNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPostresNombres(postresNombresObj);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile