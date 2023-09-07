import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function EditMenu() {
  const params = useParams();
  const navigate = useNavigate();

  const [platoNombre, setPlatoNombre] = useState("");
  const [postreNombre, setPostreNombre] = useState("");
  const [menuPrecio, setMenuPrecio] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [specialidades, setSpecialidades] = useState([]);

  const handlePlatoNombreChange = (e) => setPlatoNombre(e.target.value);
  const handlePostreNombreChange = (e) => setPostreNombre(e.target.value);
  const handleMenuPrecioChange = (e) => setMenuPrecio(e.target.value);
  const handleWeekDayChange = (e) => setWeekDay(e.target.value);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await service.get("/esp/especialidades");
        setSpecialidades(response.data);
      } catch (error) {
        navigate("/user/myprofile");
      }
    }

    fetchData();

    async function getData() {
      try {
        const response = await service.get(`/menu/edit-menu/${params.id}`);
        console.log(response);
        setPlatoNombre(response.data.platoNombre);
        setPostreNombre(response.data.postreNombre);
        setMenuPrecio(response.data.menuPrecio);
        setWeekDay(response.data.weekDay);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    }

    getData();
  }, [navigate, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await service.put(`/menu/edit-menu/${params.id}`, {
        platoNombre,
        postreNombre,
        menuPrecio,
        weekDay,
      });

      navigate("/user/myprofile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/menu/edit-menu/${params.id}`);
      navigate("/user/myprofile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div class= "bodycomponentes" style = {{marginTop: "50px"}}>
      <Card.Body>
        <Card.Title style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold', textAlign: 'center', color: "#92caf2"}}>
          Edita tu menú
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="platoNombre" style={{ margin: "10px", fontWeight: 'bold' }}>Plato principal</Form.Label>
            <Form.Select
              name="platoNombre"
              onChange={handlePlatoNombreChange}
              value={platoNombre}
              className="input-narrow"
            >
              <option value="">Seleccionar plato</option>
              {specialidades.map((especialidad) => (
                <option key={especialidad._id} value={especialidad.especialidadNombre}>
                  {especialidad.especialidadNombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="postreNombre" style={{ margin: "10px", fontWeight: 'bold' }}>Postre</Form.Label>
            <Form.Select
              name="postreNombre"
              onChange={handlePostreNombreChange}
              value={postreNombre}
              className="input-narrow"
            >
              <option value="">Seleccionar postre</option>
              {specialidades.map((especialidad) => (
                <option
                  key={especialidad._id}
                  value={especialidad.especialidadNombre}
                >
                  {especialidad.especialidadNombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="menuPrecio" style={{ margin: "10px", fontWeight: 'bold' }}>Precio:</Form.Label>
            <Form.Control
              type="text"
              name="menuPrecio"
              onChange={handleMenuPrecioChange}
              value={menuPrecio}
              className="input-narrow"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="weekDay" style={{ margin: "10px", fontWeight: 'bold' }}>Día de la semana</Form.Label>
            <Form.Control
              type="text"
              name="weekDay"
              onChange={handleWeekDayChange}
              value={weekDay}
              className="input-narrow"
            />
          </Form.Group>

          <Button variant="outline-success" type="submit" style={{ display: 'block', margin: '0 auto' }}>
            Actualizar menú
          </Button>

          <br />

          <Button variant="outline-danger" onClick={handleDelete}>
            Borrar menú
          </Button>
        </Form>
      </Card.Body>
    </div>
  );
}

export default EditMenu;


