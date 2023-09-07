import React, { useContext, useEffect, useState } from "react";
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
      const especialidadesResponse = await service.get(
        "/esp/espCreada/allEspecialidades"
      );
      console.log(especialidadesResponse.data);
      setAllEspecialidades(especialidadesResponse.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const isUserApuntado = (especialidad) => {
    return especialidad.participantes.includes(activeUserId);
  };

  const apuntarEspecialidad = async (especialidadId) => {
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
    <div style={{ marginTop: "30px" }}>
      <h2>Lista de Especialidades</h2>
      <Row xs={1} md={3} className="g-4 justify-content-center">
        {allEspecialidades.length === 0 ? (
          <h3>... buscando</h3>
        ) : (
          allEspecialidades.map((eachEspecialidad) => (
            <Col key={eachEspecialidad._id}>
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
                  <Card.Img
                    variant="top"
                    src={eachEspecialidad.especialidadPic}
                    alt={eachEspecialidad.especialidadNombre}
                  />
                  <Card.Body>
                    <Card.Title className="h5">
                      {eachEspecialidad.especialidadNombre}
                    </Card.Title>
                    <Card.Text className="mb-2">
                      Precio: {eachEspecialidad.especialidadPrecio} €
                    </Card.Text>
                    <Card.Text className="mb-2">
                      Vecinochef:{" "}
                      {eachEspecialidad.creador._id === activeUserId ? (
                        <>{eachEspecialidad.creador.userName}</>
                      ) : (
                        <Link
                          to={`/user/user-profile/${eachEspecialidad.creador._id}`}
                        >
                          {eachEspecialidad.creador.userName}
                        </Link>
                      )}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <ul className="list-unstyled">
                        {eachEspecialidad.participantes.map((eachParticipante) => (
                          <li key={eachParticipante}>
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
                    {eachEspecialidad.creador._id !== activeUserId && (
                      // Verifica si el creador no es el usuario logeado
                      isUserApuntado(eachEspecialidad) ? (
                        <Button
                          variant="danger"
                          onClick={() =>
                            desapuntarEspecialidad(eachEspecialidad._id)
                          }
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
                      )
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

export default EspecialidadesList;

