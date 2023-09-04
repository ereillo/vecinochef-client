
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

function AddMenu(props) {
  const navigate = useNavigate();

  const [platoNombre, setPlatoNombre] = useState(""); // Cambiar platoNombre por platoId
  const [postreNombre, setPostreNombre] = useState(""); // Cambiar postreNombre por postreId
  const [weekDay, setWeekDay] = useState("");
  const [menuPrecio, setMenuPrecio] = useState("");
  const [specialidades, setSpecialidades] = useState([]); // Nuevo estado para almacenar especialidades

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
    <div>
      <h3>Crear menú</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="platoNombre">Plato principal</label>
        <select
          name="platoNombre"
          onChange={handlePlatoIdChange}
          value={platoNombre}
        >
          <option value="">Seleccionar plato</option>
          {specialidades.map((especialidad) => (
            <option key={especialidad._id} value={especialidad.especialidadNombre}>
              {especialidad.especialidadNombre}
            </option>
          ))}
        </select>

        <br />

        <label htmlFor="postreNombre">Postre</label>
        <select
          name="postreNombre"
          onChange={handlePostreIdChange}
          value={postreNombre}
        >
          <option value="">Seleccionar postre</option>
          {specialidades.map((especialidad) => (
            <option key={especialidad._id} value={especialidad.especialidadNombre}>
              {especialidad.especialidadNombre}
            </option>
          ))}
        </select>

        <br />

        <label htmlFor="menuPrecio">Precio</label>
        <input
          type="text"
          name="menuPrecio"
          onChange={handleMenuPrecioChange}
          value={menuPrecio}
        />
        <br />

        <label htmlFor="weekDay">Día de la semana</label>
        <input
          type="text"
          name="weekDay"
          onChange={handleWeekDayChange}
          value={weekDay}
        />

        <br />
        <button type="submit">Crear menú</button>
      </form>
    </div>
  );
}

export default AddMenu;
