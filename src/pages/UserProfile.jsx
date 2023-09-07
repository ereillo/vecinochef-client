import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import EspecialidadesCreadasUsuarios from "../components/EspecialidadesCreadasUsuarios";
import MenusCreadosUsuarios from "../components/MenusCreadosUsuarios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function UserProfile() {
  const { userId } = useParams();
  const [allEspecialidades, setAllEspecialidades] = useState([]);
  const [allMenus, setAllMenus] = useState([]);
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});
  const [userData, setUserData] = useState({})




  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getData(userId);
    }
  }, [userId]);

  const getData = async (userId) => {
    console.log(userId);
    try {
      const response = await service.get(`/user/user-profile/${userId}`);
      console.log(response.data);
      setAllEspecialidades(response.data.especialidades);
      setAllMenus(response.data.menu);
      setUserData(response.data.user);

      const platosNombresObj = {};
      response.data.especialidades.forEach((especialidad) => {
        platosNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPlatosNombres(platosNombresObj);

      const postresNombresObj = {};
      response.data.menu.forEach((especialidad) => {
        postresNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPostresNombres(postresNombresObj);
      setPostresNombres(postresNombresObj);
    

    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div class= "bodycomponentes" style = {{marginTop: "50px", marginTop: "30px" }}>
    <Container style={{ marginTop: "30px" }}>
      <Row className="justify-content-center">
        <Col xs={10} sm={4} md={3} lg={5}>
          <Card>
            <Card.Body>
              <Card.Title>
                Página de perfil de {userData.userName} {userData.userSurname}
              </Card.Title>
              <Card.Img
                src={userData.profilePic}
                alt=""
                width="150"
                style={{ borderRadius: "500px" }}
              />
              <hr />
              <EspecialidadesCreadasUsuarios />
              <hr />
              <MenusCreadosUsuarios />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default UserProfile;
