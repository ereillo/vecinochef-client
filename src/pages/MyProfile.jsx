import { useEffect, useState } from "react";
import AddEspecialidad from "../pages/AddEspecialidad";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";

function MyProfile() {

  const [allEspecialidades, setAllEspecialidades] = useState()
  const navigate = useNavigate()

  useEffect(() => {

    getData()

  }, [])

  const getData = async () => {

    try {
      const response = await service.get("/user/myprofile")
      console.log(response.data)
      setAllEspecialidades(response.data)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

  return (
    <div>
    {/* <AddEspecialidad getData={getData} setAllEspecialidades = {setAllEspecialidades}/> */}
     <br/>
     <hr/>
     <h3>Lista de Especialidades</h3>
     {allEspecialidades === undefined
      ? <h3>... buscando</h3>
      : allEspecialidades.map((eachEspecialidad) => {
        return (
          <div key={eachEspecialidad._id}>
            <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>{eachEspecialidad.especialidadNombre}</Link>
            <br/>
            <img src={eachEspecialidad.especialidadPic} width="150" />
            <br/>
            {/* <Link to={`/esp/edit-especialidad/${eachEspecialidad._id}`}>{eachEspecialidad.creador[0].userName}</Link> */}
          </div>
        )
      })
      }
    </div>
  )
}

export default MyProfile