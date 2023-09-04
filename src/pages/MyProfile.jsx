import { useContext, useEffect, useState } from "react";
import AddEspecialidad from "../pages/AddEspecialidad";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context"

function MyProfile() {

  const [allEspecialidades, setAllEspecialidades] = useState()
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {

    getData()

  }, [])

  const getData = async () => {

    try {
      const response = await service.get(`/user/myprofile`)
      console.log(response.data)
      setAllEspecialidades(response.data)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  return (
    <div>
    <Link to={`/user/edit-profile/${activeUserId}`}>Edita tu perfil</Link>
    {/* <AddEspecialidad getData={getData} setAllEspecialidades = {setAllEspecialidades}/> */}
     <br/>
     <hr/>
     <h3>Lista de Especialidades</h3>
     {allEspecialidades === undefined
      ? <h3>... buscando</h3>
      : allEspecialidades.map((eachEspecialidad) => {
        return (
          <>
          <div key={eachEspecialidad._id}>
            <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>{eachEspecialidad.especialidadNombre}</Link>
            <br/>
            <img src={eachEspecialidad.especialidadPic} width="150" />
            <br/>
            {/* <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>{eachEspecialidad.creador[0].userName}</Link> */}
          </div>
          </>
        )
      })
      }
    </div>
  )
}

export default MyProfile