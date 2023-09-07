import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EspecialidadesList() {
  const [allEspecialidades, setAllEspecialidades] = useState([]);
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const especialidadesResponse = await service.get("/esp/especialidades");
      console.log(especialidadesResponse.data);
      setAllEspecialidades(especialidadesResponse.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const apuntarEspecialidad = async (especialidadId) => {
    console.log(especialidadId);
    try {
      const response = await service.post(
        `/esp/especialidades/apuntar/${especialidadId}`
      );
      console.log(response.data.message);
      getData();
    } catch (error) {
      console.error("Error al apuntarse a la especialidad", error);
    }
  };

  const desapuntarEspecialidad = async (especialidadId) => {
    try {
      const response = await service.post(
        `/esp/especialidades/desapuntar/${especialidadId}`
      );
      console.log(response.data.message);
      getData();
    } catch (error) {
      console.log("error al desapuntarte");
    }
  };

  return (
    <div style={{marginTop: "30px"}}>
      <h2 style={{marginBottom: "30px"}} >Lista de Especialidades</h2>
      <Row xs={1} md={2} lg={4} className="justify-content-center">
        {allEspecialidades.length === 0 ? (
          <h3>... buscando</h3>
        ) : (
          allEspecialidades.map((eachEspecialidad) => (
            <Col
              key={eachEspecialidad._id}
              style={{ marginBottom: "20px" }}
              className="d-flex justify-content-center"
            >
              <Card style={{ maxWidth: "15rem" }}>
                <Card.Img
                  variant="top"
                  src={eachEspecialidad.especialidadPic}
                  alt={eachEspecialidad.especialidadNombre}
                />
                <Card.Body style={{ padding: "1rem" }}>
                  <Card.Title>{eachEspecialidad.especialidadNombre}</Card.Title>
                  <Card.Text>
                    Precio: {eachEspecialidad.especialidadPrecio}€
                  </Card.Text>
                  <Card.Text>
                    Vecinochef:{" "}
                    {eachEspecialidad.creador._id === activeUserId ? (
                      <span>{eachEspecialidad.creador.userName}</span>
                    ) : (
                      <Link
                        to={`/user/user-profile/${eachEspecialidad.creador._id}`}
                      >
                        {eachEspecialidad.creador.userName}
                      </Link>
                    )}
                  </Card.Text>
                  <Card.Text>
                    Vecinos apuntados:
                    <ul className="list-unstyled">
                      {eachEspecialidad.participantes.map((eachParticipante) => (
                        <li key={eachParticipante._id}>
                          {eachParticipante._id === activeUserId ? (
                            <span>{eachParticipante.userName}</span>
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
                  {eachEspecialidad.participantes.some(
                    (participant) => participant._id === activeUserId
                  ) ? (
                    <Button
                      variant="danger"
                      onClick={() => desapuntarEspecialidad(eachEspecialidad._id)}
                    >
                      Desapuntarse
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => apuntarEspecialidad(eachEspecialidad._id)}
                    >
                      Apuntarse
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default EspecialidadesList;

