import React from "react";
import { Link } from "react-router-dom";

function MenusApuntado({ allMenus, platosNombres, postresNombres, userId }) {
  const menusUsuario = allMenus.filter((menu) =>
    menu.participantes.some((participant) => participant._id === userId)
  );

  return (
    <div>
      <h3>Menús a los que estás apuntado</h3>
      {menusUsuario.length === 0 ? (
        <p>No estás apuntado a ningún menú.</p>
      ) : (
        menusUsuario.map((menu) => (
          <div key={menu._id}>
            <Link to={`/menu/edit-menu/${menu._id}`}>
              {platosNombres[menu.platoNombre]} y {postresNombres[menu.postreNombre]}
            </Link>
            <br />
          </div>
        ))
      )}
    </div>
  );
}

export default MenusApuntado;



