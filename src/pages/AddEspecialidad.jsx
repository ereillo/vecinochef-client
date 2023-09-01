import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Asegúrate de importar axios
import service from "../services/service.config";

function AddEspecialidad(props) {
  const navigate = useNavigate();

  const [especialidadNombre, setEspecialidadNombre] = useState("");
  const [especialidadIngredientes, setEspecialidadIngredientes] = useState("");
  const [especialidadPic, setEspecialidadPic] = useState("");
  const [especialidadPrecio, setEspecialidadPrecio] = useState("");
  const [isEspecialidad, setIsEspecialidad] = useState(false);

  const handleNameChange = (e) => setEspecialidadNombre(e.target.value);
  const handleIngredientesChange = (e) => setEspecialidadIngredientes(e.target.value);
  const handlePicChange = (e) => setEspecialidadPic(e.target.value);
  const handlePrecioChange = (e) => setEspecialidadPrecio(e.target.value);
  const handleIsEspecialidadChange = (e) => setIsEspecialidad(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.post("/user/add-especialidad", {
        especialidadNombre,
        especialidadIngredientes,
        especialidadPic,
        especialidadPrecio,
        isEspecialidad,
      });
      props.getData();
    } catch (error) {
      navigate("/error");
    }
}

    return (
      <div>
        <h3>Crear plato</h3>

        <form onSubmit={handleSubmit}>
          <label htmlFor="especialidadNombre">Nombre</label>
          <input
            type="text"
            name="especialidadNombre"
            onChange={handleNameChange}
            value={especialidadNombre}
          />

          <br />

          <label htmlFor="especialidadIngredientes">Ingredientes</label>
          <input
            type="text"
            name="especialidadIngredientes"
            onChange={handleIngredientesChange}
            value={especialidadIngredientes}
          />

          <br />

          <label htmlFor="especialidadPic">Foto</label>
          <input
            type="text"
            name="especialidadPic"
            onChange={handlePicChange}
            value={especialidadPic}
          />

          <br />

          <label htmlFor="especialidadPrecio">Precio</label>
          <input
            type="text"
            name="especialidadPrecio"
            onChange={handlePrecioChange}
            value={especialidadPrecio}
          />

          <br />

          <label htmlFor="isEspecialidad">¿Es una especialidad?</label>
          <input
            type="checkbox"
            name="isEspecialidad"
            onChange={handleIsEspecialidadChange}
            checked={isEspecialidad}
          />

          <br />

          <button type="submit">Agregar</button>
        </form>
      </div>
    );
  };


export default AddEspecialidad;
