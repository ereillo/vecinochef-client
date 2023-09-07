
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import service from "../services/service.config";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';

// function AddMenu(props) {
//   const navigate = useNavigate();

//   const [platoNombre, setPlatoNombre] = useState("")
//   const [postreNombre, setPostreNombre] = useState("")
//   const [weekDay, setWeekDay] = useState("")
//   const [menuPrecio, setMenuPrecio] = useState("");
//   const [specialidades, setSpecialidades] = useState([])
//   const [daysOfWeekEnum] = useState([
//     "Lunes",
//     "Martes",
//     "Miércoles",
//     "Jueves",
//     "Viernes",
//     "Sábado",
//     "Domingo",
//   ]);

//   const handlePlatoIdChange = (e) => setPlatoNombre(e.target.value);
//   const handlePostreIdChange = (e) => setPostreNombre(e.target.value);
//   const handleWeekDayChange = (e) => setWeekDay(e.target.value);
//   const handleMenuPrecioChange = (e) => setMenuPrecio(e.target.value);

//   useEffect(() => {
//     async function fetchSpecialidades() {
//       try {
//         const response = await service.get("/esp/especialidades");
//         setSpecialidades(response.data); // Cargar las especialidades del usuario
//       } catch (error) {
//         navigate("/user/myprofile");
//       }
//     }

//     fetchSpecialidades();
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await service.post("/menu/add-menu", {
//         platoNombre, 
//         postreNombre, 
//         weekDay,
//         menuPrecio,
//       });
//       props.getData();
//     } catch (error) {
//       navigate("/user/myprofile");
//     }
//   };

//   return (
//     <div>
//       <h3 style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold' }}>Crea un menú</h3>

//       <form onSubmit={handleSubmit}>
//         <Form.Label htmlFor="platoNombre">Plato principal</Form.Label>
//         <select
//           name="platoNombre"
//           onChange={handlePlatoIdChange}
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
//           onChange={handlePostreIdChange}
//           value={postreNombre}
//         >
//           <option value="">Seleccionar postre</option>
//           {specialidades.map((especialidad) => (
//             <option key={especialidad._id} value={especialidad.especialidadNombre}>
//               {especialidad.especialidadNombre}
//             </option>
//           ))}
//         </select>

//         <br />

//         <Form.Label htmlFor="menuPrecio">Precio</Form.Label>
//         <input
//           type="text"
//           name="menuPrecio"
//           onChange={handleMenuPrecioChange}
//           value={menuPrecio}
//         />
//         <br />

//         <Form.Label htmlFor="weekDay">Día de la semana</Form.Label>
//         <select name="weekDay" onChange={handleWeekDayChange} value={weekDay}>
//         <option value="">Seleccionar día</option>
//         {daysOfWeekEnum.map((day) => (
//           <option key = {day} value = {day}>
//             {day}
//           </option>
//         ))}
//         </select>
//         <br />
//         <Button variant="outline-success" type="submit">Crear menú</Button>
//       </form>
//     </div>
//   );
// }

// export default AddMenu;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AddMenu(props) {
  const navigate = useNavigate();

  const [platoNombre, setPlatoNombre] = useState("")
  const [postreNombre, setPostreNombre] = useState("")
  const [weekDay, setWeekDay] = useState("")
  const [menuPrecio, setMenuPrecio] = useState("");
  const [specialidades, setSpecialidades] = useState([])
  const [daysOfWeekEnum] = useState([
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]);

  const handlePlatoIdChange = (e) => setPlatoNombre(e.target.value);
  const handlePostreIdChange = (e) => setPostreNombre(e.target.value);
  const handleWeekDayChange = (e) => setWeekDay(e.target.value);
  const handleMenuPrecioChange = (e) => setMenuPrecio(e.target.value);

  useEffect(() => {
    async function fetchSpecialidades() {
      try {
        const response = await service.get("/esp/especialidades");
        setSpecialidades(response.data); // Cargar las especialidades del usuario
      } catch (error) {
        navigate("/user/myprofile");
      }
    }

    fetchSpecialidades();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.post("/menu/add-menu", {
        platoNombre, 
        postreNombre, 
        weekDay,
        menuPrecio,
      });
      props.getData();
    } catch (error) {
      navigate("/user/myprofile");
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold', textAlign: 'center' }}>
          Crea un menú
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="platoNombre">Plato principal</Form.Label>
            <Form.Select
              name="platoNombre"
              onChange={handlePlatoIdChange}
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
              onChange={handlePostreIdChange}
              value={postreNombre}
              className="input-narrow"
            >
              <option value="">Seleccionar postre</option>
              {specialidades.map((especialidad) => (
                <option key={especialidad._id} value={especialidad.especialidadNombre}>
                  {especialidad.especialidadNombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="menuPrecio">Precio</Form.Label>
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
            <Form.Select name="weekDay" onChange={handleWeekDayChange} value={weekDay} className="input-narrow">
              <option value="">Seleccionar día</option>
              {daysOfWeekEnum.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="outline-success" type="submit" style={{ display: 'block', margin: '0 auto' }}>
            Crear menú
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddMenu;
