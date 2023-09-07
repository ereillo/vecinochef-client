// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import service from "../services/service.config";
// import { uploadImageService } from "../services/service.upload";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';


// function AddEspecialidad(props) {
//   const navigate = useNavigate();

//   const [especialidadNombre, setEspecialidadNombre] = useState("");
//   const [especialidadIngredientes, setEspecialidadIngredientes] = useState("");
//   const [especialidadPic, setEspecialidadPic] = useState("");
//   const [especialidadPrecio, setEspecialidadPrecio] = useState("");
//   const [isEspecialidad, setIsEspecialidad] = useState(false);

//   const [isUploading, setIsUploading] = useState(false);

//   const handleNameChange = (e) => setEspecialidadNombre(e.target.value);
//   const handleIngredientesChange = (e) => setEspecialidadIngredientes(e.target.value);
//   const handlePicChange = (e) => setEspecialidadPic(e.target.value);
//   const handlePrecioChange = (e) => setEspecialidadPrecio(e.target.value);
//   const handleIsEspecialidadChange = (e) => setIsEspecialidad(e.target.checked);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await service.post("/esp/add-especialidad", {
//         especialidadNombre,
//         especialidadIngredientes,
//         especialidadPic,
//         especialidadPrecio,
//         isEspecialidad,
//       });
//       props.getData();
//     } catch (error) {
//       navigate("/user/myprofile");
//     }
//   };

//   const handleFileUpload = async (event) => {

//     if (!event.target.files[0]) {
//       return;
//     }

//     setIsUploading(true);

//     const uploadData = new FormData(); 
//     uploadData.append("image", event.target.files[0]);

//     try {
//       const response = await uploadImageService(uploadData);
//       console.log(response.data.cloudinaryUrl + "CONSOLE CLOUDINARY")
//       setEspecialidadPic(response.data.cloudinaryUrl);

//       setIsUploading(false); 
//     } catch (error) {
//       navigate("/error");
//     }
//   };

//   return (
//     <div>
//       <h3 style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold' }}>Crea un plato</h3>

//       <form onSubmit={handleSubmit}>
//         <Form.Label htmlFor="especialidadNombre" style={{margin: "10px"}}>Nombre</Form.Label>
//         <input
//           type="text"
//           name="especialidadNombre"
//           onChange={handleNameChange}
//           value={especialidadNombre.especialidadNombre}
//         />

//         <br />

//         <Form.Label htmlFor="especialidadIngredientes">Ingredientes</Form.Label>
//         <input
//           type="text"
//           name="especialidadIngredientes"
//           onChange={handleIngredientesChange}
//           value={especialidadIngredientes}
//         />

//         <br />

//         <Form.Label htmlFor="especialidadPrecio">Precio</Form.Label>
//         <input
//           type="text"
//           name="especialidadPrecio"
//           onChange={handlePrecioChange}
//           value={especialidadPrecio}
//         />

//         <br />
    
//         <div>
//           <Form.Label></Form.Label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleFileUpload}
//             disabled={isUploading}
//           />

//         </div>
//         {isUploading ? <h3>... uploading image</h3> : null}
//         {especialidadPic ? (
//           <div>
//             <img src={especialidadPic} alt="img" width={200} />
//           </div>
//         ) : null}

//          <br />

//          <Form.Label htmlFor="isEspecialidad">¿Es una especialidad?</Form.Label>
//          <input
//          type="checkbox"
//          name="isEspecialidad"
//          onChange={handleIsEspecialidadChange}
//          checked={isEspecialidad}
//          />

//          <br />

//          <Button variant="outline-success" type="submit">Crear plato</Button>
//       </form>
//     </div>
//   );
// }

// export default AddEspecialidad;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/service.upload";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
      <Card>
        <Card.Body>
          <Card.Title style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold', textAlign: 'center' }}>
            Crea un plato
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="especialidadNombre" style={{ margin: "10px" }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="especialidadNombre"
                onChange={handleNameChange}
                value={especialidadNombre}
                className="input-narrow"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="especialidadIngredientes">Ingredientes</Form.Label>
              <Form.Control
                type="text"
                name="especialidadIngredientes"
                onChange={handleIngredientesChange}
                value={especialidadIngredientes}
                className="input-narrow"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="especialidadPrecio">Precio</Form.Label>
              <Form.Control
                type="text"
                name="especialidadPrecio"
                onChange={handlePrecioChange}
                value={especialidadPrecio}
                className="input-narrow"
              />
            </Form.Group>

            <div>
              <Form.Label></Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="input-narrow"
              />
            </div>
            {isUploading ? <h3>... subiendo imagen</h3> : null}
            {especialidadPic ? (
              <div>
                <img src={especialidadPic} alt="img" width={200} />
              </div>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label htmlFor="isEspecialidad">¿Es una especialidad?</Form.Label>
              <Form.Check
                type="checkbox"
                name="isEspecialidad"
                onChange={handleIsEspecialidadChange}
                checked={isEspecialidad}
                className="input-narrow"
              />
            </Form.Group>

            <Button variant="outline-success" type="submit" style={{ display: 'block', margin: '0 auto' }}>
              Crear plato
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddEspecialidad;

