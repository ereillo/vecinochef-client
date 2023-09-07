
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/service.upload";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
    <div class= "bodycomponentes" style = {{marginTop: "50px"}}>
        <Card.Body>
          <Card.Title style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold', textAlign: 'center' }}>
            Edita tu plato
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="especialidadNombre" style={{ margin: "10px", fontWeight: 'bold' }}>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="especialidadNombre"
                onChange={handleNameChange}
                value={especialidadNombre}
                className="input-narrow"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="especialidadIngredientes" style={{ margin: "10px", fontWeight: 'bold' }}>Ingredientes</Form.Label>
              <Form.Control
                type="text"
                name="especialidadIngredientes"
                onChange={handleIngredientesChange}
                value={especialidadIngredientes}
                className="input-narrow"
              />
            </Form.Group>

            <div>
              <Form.Label style={{ margin: "10px", fontWeight: 'bold' }}>Añadir foto:</Form.Label>
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
              <Form.Label htmlFor="especialidadPrecio" style={{ margin: "10px", fontWeight: 'bold' }}>Precio</Form.Label>
              <Form.Control
                type="text"
                name="especialidadPrecio"
                onChange={handlePrecioChange}
                value={especialidadPrecio}
                className="input-narrow"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="isEspecialidad" style={{ margin: "10px", fontWeight: 'bold' }}>¿Es una especialidad?</Form.Label>
              <Form.Check
                type="checkbox"
                name="isEspecialidad"
                onChange={handleIsEspecialidadChange}
                checked={isEspecialidad}
                className="input-narrow"
              />
            </Form.Group>

            <Button variant="outline-success" type="submit" style={{ display: 'block', margin: '0 auto' }}>
              Actualizar plato
            </Button>

            <br />

            <Button variant="outline-danger" onClick={handleDelete}>
              Borrar
            </Button>
          </Form>
        </Card.Body>
    </div>
  );
}

export default EditEspecialidad;
