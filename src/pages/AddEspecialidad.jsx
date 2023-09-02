import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/service.upload";

function AddEspecialidad(props) {
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.post("/esp/add-especialidad", {
        especialidadNombre,
        especialidadIngredientes,
        especialidadPic,
        especialidadPrecio,
        isEspecialidad,
      });
      props.getData();
    } catch (error) {
      navigate("/user/myprofile");
    }
  };

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
      <h3>Crear plato</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="especialidadNombre">Nombre</label>
        <input
          type="text"
          name="especialidadNombre"
          onChange={handleNameChange}
          value={especialidadNombre.especialidadNombre}
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

        <label htmlFor="especialidadPrecio">Precio</label>
        <input
          type="text"
          name="especialidadPrecio"
          onChange={handlePrecioChange}
          value={especialidadPrecio}
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

         <label htmlFor="isEspecialidad">¿Es una especialidad?</label>
         <input
         type="checkbox"
         name="isEspecialidad"
         onChange={handleIsEspecialidadChange}
         checked={isEspecialidad}
         />

        <button type="submit">Crear plato</button>
      </form>
    </div>
  );
}

export default AddEspecialidad;
