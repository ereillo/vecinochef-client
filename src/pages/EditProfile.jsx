import service from "../services/service.config";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/service.upload";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context"

function EditProfile() {

const { activeUserId } = useContext(AuthContext);

const navigate = useNavigate()

    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [profilePic, setProfilePic] = useState("")

    const [isUploading, setIsUploading] = useState(false);

    const handleUserNameChange = (e) => setUserName(e.target.value);
    const handleUserSurnameChange = (e) => setUserSurname(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value)
    const handleProfilePicChange = (e) => setProfilePic(e.target.value)

    useEffect(() => {

        getData()

    }, [])

    const getData = async () => {
        try {
    const response = await service.get(`/user/edit-profile/${activeUserId}`)
    console.log(response)
    setUserName (response.data.userName)
    setUserSurname (response.data.userSurname)
    setProfilePic (response.data.profilePic)
    setPassword (response.data.password)
    setNewPassword (response.data.newPassword)
    setConfirmNewPassword (response.data.confirmNewPassword)
        } catch (error) {
          console.log(error)
          navigate("/error")
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        await service.put(`/user/edit-profile/${activeUserId}`, {
            userName,
            userSurname,
            password,
            newPassword,
            confirmNewPassword,
            profilePic,
        })

        navigate("/user/myprofile")

    } catch (error) {
      console.log(error)
      navigate("/error")
    }
    }

    const handleDelete = async ( ) => {

    try {
    
    await service.delete (`/user/edit-profile/${activeUserId}`)
    navigate("/auth/login")
        
    } catch (error) {
       console.log(error) 
       navigate("/error")
    }

    }

    const handleFileUpload = async (event) => {

        if (!event.target.files[0]) {
          return;
        }
    
        setIsUploading(true);
    
        const uploadData = new FormData(); 
        uploadData.append("image", event.target.files[0]);
    
        try {
          const response = await uploadImageService(uploadData);
          console.log(response.data.cloudinaryUrl)
          setProfilePic(response.data.cloudinaryUrl);
    
          setIsUploading(false); 
        } catch (error) {
          navigate("/error");
        }
      };
  
  return (
    <div>
    <h3>Editar perfil</h3>

    <form onSubmit={handleSubmit}>

    <div>
          <label>Añadir foto: </label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />

    </div>
    
        {isUploading ? <h3>... uploading image</h3> : null}
        {profilePic ? (
          <div>
            <img src={profilePic} alt="img" width={200} />
          </div>
        ) : null}

         <br />

      <label htmlFor="userName">Nombre</label>
      <input
        type="text"
        name="userName"
        onChange={handleUserNameChange}
        value={userName}
      />

      <br />

      <label htmlFor="userSurname">Apellido</label>
      <input
        type="text"
        name="userSurname"
        onChange={handleUserSurnameChange}
        value={userSurname}
      />

      <br />

      {/* <h4>Cambiar contraseña</h4>

      <br/>

      <label htmlFor="newPassword">Nueva contraseña</label>
      <input
        type="password"
        name="newPassword"
        onChange={handleNewPasswordChange}
        value={newPassword}
      />

      <br />

      <label htmlFor="confirmNewPassword">Confirmar nueva contraseña</label>
      <input
        type="password"
        name="confirmNewPassword"
        onChange={handleConfirmNewPasswordChange}
        checked={confirmNewPassword}
      />

      <br />

      <label htmlFor="password">Introduce contraseña actual para realizar cambios</label>
      <input
        type="password"
        name="password"
        onChange={handlePasswordChange}
        checked={password}
      />

      <br /> */}
       
      <button type="submit">Actualizar perfil</button>

      <br/>

      <button onClick = {handleDelete}>Borrar perfil</button>

    </form>
  </div>
  )
}

export default EditProfile