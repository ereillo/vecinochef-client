import { useState } from "react";
import service from "../services/service.config";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate= useNavigate()

  const [userName, setUserName] = useState("")
  const [userSurname, setUserSurname] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage]= useState("")

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleUserSurname = (e) => setUserSurname(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here
    try {
      await service.post("/auth/signup", {
        userName,
        userSurname,
        email,
        password,
        confirmPassword
      })
      navigate("/login")
      
    } catch (error) {
      console.log(error)
      if(error.response && error.response.status ===400){
        setErrorMessage(error.response.data.errorMessage)
      }else{
        navigate("/error")


      }
      
      
    }


  };

  return (
    <div>

      <h1>Registro</h1>
    
      <form onSubmit={handleSignup}>
        
        <label>Nombre:</label>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleUserNameChange}
        />

        <br />

        <label>Apellido:</label>
        <input
          type="text"
          name="userSurname"
          value={userSurname}
          onChange={handleUserSurname}
        />

        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <label>Confirmar contraseña:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />

        <br />


        <button type="submit">Regístrate</button>
        { errorMessage ? <p>{errorMessage}</p> : null }
      </form>
      
    </div>
  );
}

export default Signup;