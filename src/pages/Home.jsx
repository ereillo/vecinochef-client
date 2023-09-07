import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home() {
  const [allEspecialidades, setAllEspecialidades] = useState();
  const [allMenus, setAllMenus] = useState();
  const [platosNombres, setPlatosNombres] = useState({});
  const [postresNombres, setPostresNombres] = useState({});
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const especialidadesResponse = await service.get("/user/myprofile");
      console.log(especialidadesResponse.data);
      setAllEspecialidades(especialidadesResponse.data);

      const menusResponse = await service.get("/menu/home");
      console.log(menusResponse.data);
      setAllMenus(menusResponse.data);

      const platosNombresObj = {};
      especialidadesResponse.data.forEach((especialidad) => {
        platosNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPlatosNombres(platosNombresObj);

      const postresNombresObj = {};
      especialidadesResponse.data.forEach((especialidad) => {
        postresNombresObj[especialidad._id] = especialidad.especialidadNombre;
      });
      setPostresNombres(postresNombresObj);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const apuntarMenu = async (menuId) => {
    try {
      const response = await service.post(`/menu/home/apuntar/${menuId}`);
      console.log(response.data.message);
      getData();
    } catch (error) {
      console.error("Error al apuntarse al menú", error);
    }
  };

  const desapuntarMenu = async (menuId) => {
    try {
      const response = await service.post(`/menu/home/desapuntar/${menuId}`);
      console.log(response.data.message);
      getData();
    } catch (error) {
      console.error("Error al apuntarse al menú", error);
    }
  };

  const customWeekDayOrder = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Lista de Menús</h2>
      <Row xs={1} md={3} className="g-4 justify-content-center">
        {allMenus === undefined ? (
          <h3>... buscando</h3>
        ) : (
          allMenus
            .sort((a, b) => {
              const dayAIndex = customWeekDayOrder.indexOf(a.weekDay);
              const dayBIndex = customWeekDayOrder.indexOf(b.weekDay);
              return dayAIndex - dayBIndex;
            })
            .map((eachMenu) => (
              <Col key={eachMenu._id}>
                <div className="mx-auto">
                  <Card
                    className="mb-3"
                    style={{
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      maxWidth: "18rem",
                      marginTop: "20px",
                      marginLeft: "70px", 
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="h5">
                        {platosNombres[eachMenu.platoNombre]} y{" "}
                        {postresNombres[eachMenu.postreNombre]}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted small">
                        <span className="weekday">
                          {eachMenu.weekDay}
                        </span>
                      </Card.Subtitle>
                      <Card.Text className="mb-2">
                        <span className="menu-price">
                          Precio: {eachMenu.menuPrecio} €
                        </span>
                      </Card.Text>
                      <Card.Text className="mb-2">
                        <span className="chef">
                          Vecinochef:{" "}
                          {eachMenu.creador._id === activeUserId ? (
                            <>{eachMenu.creador.userName}</>
                          ) : (
                            <Link
                              to={`/user/user-profile/${eachMenu.creador._id}`}
                            >
                              {eachMenu.creador.userName}
                            </Link>
                          )}
                        </span>
                      </Card.Text>
                      <Card.Text className="mb-2">
                        <span className="participants">
                          Vecinos apuntados:
                        </span>
                        <ul className="list-unstyled">
                          {eachMenu.participantes.map((eachParticipante) => (
                            <li key={eachParticipante._id}>
                              {eachParticipante._id === activeUserId ? (
                                <>{eachParticipante.userName}</>
                              ) : (
                                <Link
                                  to={`/user/user-profile/${eachParticipante._id}`}
                                >
                                  {eachParticipante.userName}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </Card.Text>
                      {eachMenu.participantes.some(
                        (participant) => participant._id === activeUserId
                      ) ? (
                        <Button
                          variant="danger"
                          onClick={() => desapuntarMenu(eachMenu._id)}
                        >
                          Desapuntarse
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => apuntarMenu(eachMenu._id)}
                        >
                          Apuntarse
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))
        )}
      </Row>
    </div>
  );
}

export default Home;
