import React from 'react'
import {Link} from "react-router-dom"

function Navbar() {
  return (
    <div>

     <Link to = "/">Main</Link>
     <Link to = "/signup">Registro</Link>
     <Link to = "/login">Acceso</Link>
     <Link to = "/myprofile">Mi perfil</Link>
    


    </div>
  )
}

export default Navbar