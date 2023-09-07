// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import service from "../services/service.config";
// import { useNavigate } from "react-router-dom";
// import { uploadImageService } from "../services/service.upload";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';

// function EditEspecialidad() {

//     const params = useParams()

//     const navigate = useNavigate()

//     const [especialidadNombre, setEspecialidadNombre] = useState("");
//     const [especialidadIngredientes, setEspecialidadIngredientes] = useState("");
//     const [especialidadPic, setEspecialidadPic] = useState("");
//     const [especialidadPrecio, setEspecialidadPrecio] = useState("");
//     const [isEspecialidad, setIsEspecialidad] = useState(false);

//     const [isUploading, setIsUploading] = useState(false);

  
//     const handleNameChange = (e) => setEspecialidadNombre(e.target.value);
//     const handleIngredientesChange = (e) => setEspecialidadIngredientes(e.target.value);
//     const handlePicChange = (e) => setEspecialidadPic(e.target.value);
//     const handlePrecioChange = (e) => setEspecialidadPrecio(e.target.value);
//     const handleIsEspecialidadChange = (e) => setIsEspecialidad(e.target.checked);

//     useEffect(() => {

//         getData()

//     }, [])

//     const getData = async () => {
//         try {
//     const response = await service.get(`/esp/edit-especialidad/${params.id}`)
//     console.log(response)
//     setEspecialidadNombre (response.data.especialidadNombre)
//     setEspecialidadIngredientes (response.data.especialidadIngredientes)
//     setEspecialidadPic (response.data.cloudinaryUrl)
//     setEspecialidadPrecio (response.data.especialidadPrecio)
//     setIsEspecialidad (response.data.isEspecialidad)
//         } catch (error) {
//           console.log(error)
//           navigate("/error")
//         }

//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//     try {
//         await service.put(`/esp/edit-especialidad/${params.id}`, {
//         especialidadNombre,
//         especialidadIngredientes,
//         especialidadPic,
//         especialidadPrecio,
//         isEspecialidad 
//         })

//         navigate("/user/myprofile")

//     } catch (error) {
//       console.log(error)
//       navigate("/error")
//     }
//     }

//     const handleDelete = async ( ) => {

//     try {
    
//     await service.delete (`/esp/edit-especialidad/${params.id}`)
//     navigate("/user/myprofile")
        
//     } catch (error) {
//        console.log(error) 
//        navigate("/error")
//     }

//     }

//     const handleFileUpload = async (event) => {

//         if (!event.target.files[0]) {
//           return;
//         }
    
//         setIsUploading(true);
    
//         const uploadData = new FormData(); 
//         uploadData.append("image", event.target.files[0]);
    
//         try {
//           const response = await uploadImageService(uploadData);
    
//           setEspecialidadPic(response.data.cloudinaryUrl);
    
//           setIsUploading(false); 
//         } catch (error) {
//           navigate("/error");
//         }
//       };
  

//   return (
//     <div>
//     <h3 style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold' }}>Edita tu plato</h3>

//     <form onSubmit={handleSubmit}>
//       <Form.Label htmlFor="especialidadNombre">Nombre</Form.Label>
//       <input
//         type="text"
//         name="especialidadNombre"
//         onChange={handleNameChange}
//         value={especialidadNombre}
//       />

//       <br />

//       <Form.Label htmlFor="especialidadIngredientes">Ingredientes</Form.Label>
//       <input
//         type="text"
//         name="especialidadIngredientes"
//         onChange={handleIngredientesChange}
//         value={especialidadIngredientes}
//       />

//       <br />

//       <div>
//           <label>Añadir foto: </label>
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


//       <Form.Label htmlFor="especialidadPrecio">Precio</Form.Label>
//       <input
//         type="text"
//         name="especialidadPrecio"
//         onChange={handlePrecioChange}
//         value={especialidadPrecio}
//       />

//       <br />

//       <Form.Label htmlFor="isEspecialidad">¿Es una especialidad?</Form.Label>
//       <input
//         type="checkbox"
//         name="isEspecialidad"
//         onChange={handleIsEspecialidadChange}
//         checked={isEspecialidad}
//       />

//       <br />
       
//       <Button variant="outline-success" type="submit">Actualizar plato</Button>

//       <br/>

//       <Button variant="outline-danger" onClick = {handleDelete}>Borrar</Button>

//     </form>
//   </div>
// );
// };

// export default EditEspecialidad

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/service.upload";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditEspecialidad() {
  const params = useParams();
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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/esp/edit-especialidad/${params.id}`);
      console.log(response);
      setEspecialidadNombre(response.data.especialidadNombre);
      setEspecialidadIngredientes(response.data.especialidadIngredientes);
      setEspecialidadPic(response.data.cloudinaryUrl);
      setEspecialidadPrecio(response.data.especialidadPrecio);
      setIsEspecialidad(response.data.isEspecialidad);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/esp/edit-especialidad/${params.id}`, {
        especialidadNombre,
        especialidadIngredientes,
        especialidadPic,
        especialidadPrecio,
        isEspecialidad,
      });

      navigate("/user/myprofile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/esp/edit-especialidad/${params.id}`);
      navigate("/user/myprofile");
    } catch (error) {
      console.log(error);
      navigate("/error");
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
      setEspecialidadPic(response.data.cloudinaryUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h3 style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold', textAlign: 'center' }}>Edita tu plato</h3>
      <form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="especialidadNombre">Nombre</Form.Label>
          <input
            type="text"
            name="especialidadNombre"
            onChange={handleNameChange}
            value={especialidadNombre}
            className="form-control input-narrow"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="especialidadIngredientes">Ingredientes</Form.Label>
          <input
            type="text"
            name="especialidadIngredientes"
            onChange={handleIngredientesChange}
            value={especialidadIngredientes}
            className="form-control input-narrow"
          />
        </Form.Group>

        <div>
          <label>Añadir foto:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="form-control"
          />
        </div>
        {isUploading ? <h3>... subiendo imagen</h3> : null}
        {especialidadPic ? (
          <div>
            <img src={especialidadPic} alt="img" width={200} />
          </div>
        ) : null}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="especialidadPrecio">Precio</Form.Label>
          <input
            type="text"
            name="especialidadPrecio"
            onChange={handlePrecioChange}
            value={especialidadPrecio}
            className="form-control input-narrow"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="isEspecialidad">¿Es una especialidad?</Form.Label>
          <input
            type="checkbox"
            name="isEspecialidad"
            onChange={handleIsEspecialidadChange}
            checked={isEspecialidad}
            className="form-check-input"
          />
        </Form.Group>

        <Button variant="outline-success" type="submit" style={{ display: 'block', margin: '0 auto' }}>
          Actualizar plato
        </Button>

        <br />

        <Button variant="outline-danger" onClick={handleDelete}>
          Borrar
        </Button>
      </form>
    </div>
  );
}

export default EditEspecialidad;
