import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";

function AddMenu(props) {
  const navigate = useNavigate();

  const [platoNombre, setPlatoNombre] = useState("");
  const [postreNombre, setPostreNombre] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [menuPrecio, setMenuPrecio] = useState("");

  const handlePlatoNombreChange = (e) => setPlatoNombre(e.target.value);
  const handlePostreNombreChange = (e) => setPostreNombre(e.target.value);
  const handleWeekDayChange = (e) => setWeekDay(e.target.value);
  const handleMenuPrecioChange = (e) => setMenuPrecio(e.target.value);

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
          type="text"
          name="platoNombre"
          onChange={handlePlatoNombreChange}
          value={platoNombre.platoNombre}
        >
          <option value="">Seleccionar plato</option>
          {}
          </select>

        <br />

        <label htmlFor="postreNombre">Postre</label>
        <input
          type="text"
          name="postreNombre"
          onChange={handlePostreNombreChange}
          value={postreNombre}
        />

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
