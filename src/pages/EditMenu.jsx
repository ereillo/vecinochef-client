// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import service from "../services/service.config";
// import { useNavigate } from "react-router-dom";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';

// function EditMenu() {
//   const params = useParams();

//   const navigate = useNavigate();

//   const [platoNombre, setPlatoNombre] = useState("");
//   const [postreNombre, setPostreNombre] = useState("");
//   const [menuPrecio, setMenuPrecio] = useState("");
//   const [weekDay, setWeekDay] = useState("");
//   const [specialidades, setSpecialidades] = useState([]);

//   const handlePlatoNombreChange = (e) => setPlatoNombre(e.target.value);
//   const handlePostreNombreChange = (e) => setPostreNombre(e.target.value);
//   const handleMenuPrecioChange = (e) => setMenuPrecio(e.target.value);
//   const handleWeekDayChange = (e) => setWeekDay(e.target.value);

//   useEffect(() => {
//     async function fetchSpecialidades() {
//       try {
//         const response = await service.get("/esp/especialidades");
//         setSpecialidades(response.data);
//       } catch (error) {
//         navigate("/user/myprofile");
//       }
//     }

//     getData();

//     fetchSpecialidades();
//   }, [navigate]);

//   const getData = async () => {
//     try {
//       const response = await service.get(`/menu/edit-menu/${params.id}`);
//       console.log(response);
//       setPlatoNombre(response.data.platoNombre);
//       setPostreNombre(response.data.postreNombre);
//       setMenuPrecio(response.data.menuPrecio);
//       setWeekDay(response.data.weekDay);
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await service.put(`/menu/edit-menu/${params.id}`, {
//         platoNombre,
//         postreNombre,
//         menuPrecio,
//         weekDay,
//       });

//       navigate("/user/myprofile");
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await service.delete(`/menu/edit-menu/${params.id}`);
//       navigate("/user/myprofile");
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   return (
//     <div>
//       <h3 style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold' }}>Edita tu menú</h3>

//       <form onSubmit={handleSubmit}>
//         <Form.Label htmlFor="platoNombre">Plato principal</Form.Label>
//         <select
//           name="platoNombre"
//           onChange={handlePlatoNombreChange}
//           value={platoNombre}
//         >
//           <option value="">Seleccionar plato</option>
//           {specialidades.map((especialidad) => (
//             <option key={especialidad._id} value={especialidad.especialidadNombre}>
//               {especialidad.especialidadNombre}
//             </option>
//           ))}
//         </select>
      

//         <br />

//         <Form.Label htmlFor="postreNombre">Postre</Form.Label>
//         <select
//           name="postreNombre"
//           onChange={handlePostreNombreChange}
//           value={postreNombre}
//         >
//           <option value="">Seleccionar postre</option>
//           {specialidades.map((especialidad) => (
//             <option
//               key={especialidad._id}
//               value={especialidad.especialidadNombre}
//             >
//               {especialidad.especialidadNombre}
//             </option>
//           ))}
//         </select>

//         <br />

//         <Form.Label htmlFor="menuPrecio">Precio:</Form.Label>
//         <input
//           type="text"
//           name="menuPrecio"
//           onChange={handleMenuPrecioChange}
//           value={menuPrecio}
//         />

//         <br />

//         <Form.Label htmlFor="weekDay">Día de la semana</Form.Label>
//         <input
//           type="text"
//           name="weekDay"
//           onChange={handleWeekDayChange}
//           value={weekDay}
//         />

//         <br />

//         <Button variant="outline-success" type="submit">Actualizar menú</Button>

//         <br />

//         <Button variant="outline-danger" onClick={handleDelete}>Borrar menú</Button>
//       </form>
//     </div>
//   );
// }

// export default EditMenu;
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
    <Card>
      <Card.Body>
        <Card.Title style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold', textAlign: 'center' }}>
          Edita tu menú
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="platoNombre">Plato principal</Form.Label>
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
            <Form.Label htmlFor="postreNombre">Postre</Form.Label>
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
            <Form.Label htmlFor="menuPrecio">Precio:</Form.Label>
            <Form.Control
              type="text"
              name="menuPrecio"
              onChange={handleMenuPrecioChange}
              value={menuPrecio}
              className="input-narrow"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="weekDay">Día de la semana</Form.Label>
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
    </Card>
  );
}

export default EditMenu;


