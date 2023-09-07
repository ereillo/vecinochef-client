// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import service from "../services/service.config";

// import { useContext } from "react";
// import { AuthContext } from "../context/auth.context";

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';

// function Login() {

//   const {verifyToken} = useContext(AuthContext)
//   const navigate= useNavigate()

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [errorMessage, setErrorMessage]= useState("")

//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     // ... login logic here
    
// try {
      
//       const response = await service.post("/auth/login", {
//         email,
//         password
//       })

//       console.log(response)

//       // almacenamos el token en el LocalStorage
//       localStorage.setItem("authToken", response.data.authToken)

//       await verifyToken()

//       navigate("/user/myprofile")

//     } catch (error) {
//       console.log(error)
//       if (error.response && error.response.status === 400) {
//         setErrorMessage(error.response.data.errorMessage)
//       } else {
//         navigate("/error")
//       }
//     }

//   };

//   return (
//     <div>

//       <h3 style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold' }}>Accede con tu correo</h3>

//       <form onSubmit={handleLogin}>
//         <Form.Label>Email:</Form.Label>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={handleEmailChange}
//         />

//         <br />

//         <Form.Label>Contraseña:</Form.Label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={handlePasswordChange}
//         />

//         <br />

//         <Button variant="outline-primary" type="submit">Accede</Button>
//         { errorMessage ? <p>{errorMessage}</p> : null }
//       </form>
      
//     </div>
//   );
// }

// export default Login;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Login() {
  const { verifyToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post("/auth/login", {
        email,
        password
      });

      console.log(response);

      // almacenamos el token en el LocalStorage
      localStorage.setItem("authToken", response.data.authToken);

      await verifyToken();

      navigate("/user/myprofile");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold' }}>
            Accede con tu correo
          </Card.Title>
          <form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                style={{ width: "25%" }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                style={{ width: "25%" }}
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
              Accede
            </Button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
