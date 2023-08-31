import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate= useNavigate()

  const { isUserActive, verifyToken } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.removeItem("authToken");

    verifyToken()//verifica un token que no existe para reiniciar los estados


    navigate("/login")
  };
  return (
    <div>
      <Link to="/">Main</Link>
      {isUserActive === true ? (
        <>
          <Link to="/myprofile">Mi perfil</Link>
          <button onClick={handleLogOut}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
