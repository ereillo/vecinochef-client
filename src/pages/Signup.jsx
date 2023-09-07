// import { useState } from "react";
// import service from "../services/service.config";
// import { useNavigate } from "react-router-dom";

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';

// function Signup() {
//   const navigate= useNavigate()

//   const [userName, setUserName] = useState("")
//   const [userSurname, setUserSurname] = useState("")
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [errorMessage, setErrorMessage]= useState("")

//   const handleUserNameChange = (e) => setUserName(e.target.value);
//   const handleUserSurname = (e) => setUserSurname(e.target.value)
//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);
//   const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     // ... signup logic here
//     try {
//       await service.post("/auth/signup", {
//         userName,
//         userSurname,
//         email,
//         password,
//         confirmPassword
//       })
//       navigate("/login")
      
//     } catch (error) {
//       console.log(error)
//       if(error.response && error.response.status ===400){
//         setErrorMessage(error.response.data.errorMessage)
//       }else{
//         navigate("/error")


//       }
      
      
//     }


//   };

//   return (
//     <div>

//       <h3 style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold' }}>Registro</h3>
    
//       <form onSubmit={handleSignup}>
        
//         <Form.Label>Nombre:</Form.Label>
//         <input
//           type="text"
//           name="userName"
//           value={userName}
//           onChange={handleUserNameChange}
//         />

//         <br />

//         <Form.Label>Apellido:</Form.Label>
//         <input
//           type="text"
//           name="userSurname"
//           value={userSurname}
//           onChange={handleUserSurname}
//         />

//         <br />

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

//         <Form.Label>Confirmar contraseña:</Form.Label>
//         <input
//           type="password"
//           name="confirmPassword"
//           value={confirmPassword}
//           onChange={handleConfirmPasswordChange}
//         />

//         <br />


//         <Button variant="outline-primary" type="submit">Regístrate</Button>
//         { errorMessage ? <p>{errorMessage}</p> : null }
//       </form>
      
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Signup() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleUserSurnameChange = (e) => setUserSurname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      await service.post("/auth/signup", {
        userName,
        userSurname,
        email,
        password,
        confirmPassword
      });
      navigate("/login");
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
            Registro
          </Card.Title>
          <form onSubmit={handleSignup}>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={handleUserNameChange}
                style={{ width: "25%" }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Apellido:</Form.Label>
              <input
                type="text"
                name="userSurname"
                value={userSurname}
                onChange={handleUserSurnameChange}
                style={{ width: "25%" }}
              />
            </Form.Group>

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

            <Form.Group>
              <Form.Label>Confirmar contraseña:</Form.Label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={{ width: "25%" }}
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
              Regístrate
            </Button>
            {errorMessage ? <p>{errorMessage}</p> : null}
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
