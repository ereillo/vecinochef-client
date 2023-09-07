import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";

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
    async function fetchSpecialidades() {
      try {
        const response = await service.get("/esp/especialidades");
        setSpecialidades(response.data);
      } catch (error) {
        navigate("/user/myprofile");
      }
    }

    getData();

    fetchSpecialidades();
  }, [navigate]);

  const getData = async () => {
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
  };

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
    <div>
      <h3>Editar menú</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="platoNombre">Plato principal</label>
        <select
          name="platoNombre"
          onChange={handlePlatoNombreChange}
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
          onChange={handlePostreNombreChange}
          value={postreNombre}
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
        </select>

        <br />

        <label htmlFor="menuPrecio">Precio:</label>
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

        <button type="submit">Actualizar menú</button>

        <br />

        <button onClick={handleDelete}>Borrar menú</button>
      </form>
    </div>
  );
}

export default EditMenu;
