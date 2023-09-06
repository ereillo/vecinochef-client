import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/service.upload";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


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
      console.log(response.data.cloudinaryUrl + "CONSOLE CLOUDINARY")
      setEspecialidadPic(response.data.cloudinaryUrl);

      setIsUploading(false); 
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Crear plato</h3>

      <form onSubmit={handleSubmit}>
        <Form.Label htmlFor="especialidadNombre" style={{margin: "10px"}}>Nombre</Form.Label>
        <input
          type="text"
          name="especialidadNombre"
          onChange={handleNameChange}
          value={especialidadNombre.especialidadNombre}
        />

        <br />

        <Form.Label htmlFor="especialidadIngredientes">Ingredientes</Form.Label>
        <input
          type="text"
          name="especialidadIngredientes"
          onChange={handleIngredientesChange}
          value={especialidadIngredientes}
        />

        <br />

        <Form.Label htmlFor="especialidadPrecio">Precio</Form.Label>
        <input
          type="text"
          name="especialidadPrecio"
          onChange={handlePrecioChange}
          value={especialidadPrecio}
        />

        <br />
    
        <div>
          <Form.Label></Form.Label>
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

         <Form.Label htmlFor="isEspecialidad">¿Es una especialidad?</Form.Label>
         <input
         type="checkbox"
         name="isEspecialidad"
         onChange={handleIsEspecialidadChange}
         checked={isEspecialidad}
         />

         <br />

         <Button variant="outline-success" type="submit">Crear plato</Button>
      </form>
    </div>
  );
}

export default AddEspecialidad;
