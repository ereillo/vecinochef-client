import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/service.upload";


function EditEspecialidad() {

    const params = useParams()

    const navigate = useNavigate()

    const [especialidadNombre, setEspecialidadNombre] = useState("");
    const [especialidadIngredientes, setEspecialidadIngredientes] = useState("");
    const [especialidadPic, setEspecialidadPic] = useState("");
    const [especialidadPrecio, setEspecialidadPrecio] = useState("");
    const [isEspecialidad, setIsEspecialidad] = useState(false);

    const [isUploading, setIsUploading] = useState(false);

  
    const handleNameChange = (e) => setEspecialidadNombre(e.target.value);
    const handleIngredientesChange = (e) => setEspecialidadIngredientes(e.target.value);
    const handlePicChange = (e) => setEspecialidadPic(e.target.value);
    const handlePrecioChange = (e) => setEspecialidadPrecio(e.target.value);
    const handleIsEspecialidadChange = (e) => setIsEspecialidad(e.target.checked);

    useEffect(() => {

        getData()

    }, [])

    const getData = async () => {
        try {
    const response = await service.get(`/esp/edit-especialidad/${params.id}`)
    console.log(response)
    setEspecialidadNombre (response.data.especialidadNombre)
    setEspecialidadIngredientes (response.data.especialidadIngredientes)
    setEspecialidadPic (response.data.especialidadPic)
    setEspecialidadPrecio (response.data.especialidadPrecio)
    setIsEspecialidad (response.data.isEspecialidad)
        } catch (error) {
          console.log(error)
          navigate("/error")
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        await service.put(`/esp/edit-especialidad/${params.id}`, {
        especialidadNombre,
        especialidadIngredientes,
        especialidadPic,
        especialidadPrecio,
        isEspecialidad 
        })

        navigate("/user/myprofile")

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
    }

    const handleDelete = async ( ) => {

    try {
    
    await service.delete (`/esp/edit-especialidad/${params.id}`)
    navigate("/user/myprofile")
        
    } catch (error) {
       console.log(error) 
       navigate("/error")
    }

    }

    const handleFileUpload = async (event) => {

        if (!event.target.files[0]) {
          return;
        }
    
        setIsUploading(true);
    
        const uploadData = new FormData(); 
        uploadData.append("image", event.target.files[0]);
    
        try {
          const response = await uploadImageService(uploadData);
    
          setEspecialidadPic(response.data.especialidadPic);
    
          setIsUploading(false); 
        } catch (error) {
          navigate("/error");
        }
      };
  

  return (
    <div>
    <h3>Editar plato</h3>

    <form onSubmit={handleSubmit}>
      <label htmlFor="especialidadNombre">Nombre</label>
      <input
        type="text"
        name="especialidadNombre"
        onChange={handleNameChange}
        value={especialidadNombre}
      />

      <br />

      <label htmlFor="especialidadIngredientes">Ingredientes</label>
      <input
        type="text"
        name="especialidadIngredientes"
        onChange={handleIngredientesChange}
        value={especialidadIngredientes}
      />

      <br />

      <div>
          <label>Añadir foto: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />

        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        {especialidadPic ? (
          <div>
            <img src={especialidadPic} alt="img" width={200} />
          </div>
        ) : null}

         <br />


      <label htmlFor="especialidadPrecio">Precio</label>
      <input
        type="text"
        name="especialidadPrecio"
        onChange={handlePrecioChange}
        value={especialidadPrecio}
      />

      <br />

      <label htmlFor="isEspecialidad">¿Es una especialidad?</label>
      <input
        type="checkbox"
        name="isEspecialidad"
        onChange={handleIsEspecialidadChange}
        checked={isEspecialidad}
      />

      <br />
       
      <button type="submit">Actualizar plato</button>

      <br/>

      <button onClick = {handleDelete}>Borrar</button>

    </form>
  </div>
);
};

export default EditEspecialidad