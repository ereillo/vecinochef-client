 import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { uploadImageService } from "../services/service.upload";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function EditProfile() {
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handleUserSurnameChange = (e) => setUserSurname(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e) => setConfirmNewPassword(e.target.value);
  const handleProfilePicChange = (e) => setProfilePic(e.target.value);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await service.get(`/user/edit-profile/${activeUserId}`);
        console.log(response);
        setUserName(response.data.userName);
        setUserSurname(response.data.userSurname);
        setProfilePic(response.data.profilePic);
        setPassword(response.data.password);
        setNewPassword(response.data.newPassword);
        setConfirmNewPassword(response.data.confirmNewPassword);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    }

    fetchData();
  }, [navigate, activeUserId]);

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
      });

      navigate("/user/myprofile");

    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/user/edit-profile/${activeUserId}`);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData(); 
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      console.log(response.data.cloudinaryUrl);
      setProfilePic(response.data.cloudinaryUrl);

      setIsUploading(false); 
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div class= "bodycomponentes" style = {{marginTop: "50px"}}>
      <Card.Body>
        <Card.Title style={{ fontSize: '23px', color: 'blue', fontWeight: 'bold', textAlign: 'center', color: "#92caf2"}}>
          Edita tu perfil
        </Card.Title>
        <form onSubmit={handleSubmit}>
          <div>
            <Form.Label>Añadir foto: </Form.Label>
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

          <Form.Label htmlFor="userName">Nombre</Form.Label>
          <input
            type="text"
            name="userName"
            onChange={handleUserNameChange}
            value={userName}
          />
        

          <br />
            
          <Button variant="outline-success" type="submit">Actualizar perfil</Button>

          <br/>

          <Button variant="outline-danger" onClick={handleDelete}>Borrar perfil</Button>
        </form>
      </Card.Body>
    </div>
  );
}

export default EditProfile;
