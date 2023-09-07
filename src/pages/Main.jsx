import React from 'react';
import backgroundImg from '../imagenes/kisspng-chef-s-uniform-hat-royalty-free-vector-chef-hat-5ad9f67427c7b5.449037551524233844163.png'

function Main() {
  const mainStyles = {
    background: 'linear-gradient(rgba(255, 215, 0, 0.8), rgba(255, 215, 0, 0.8)), rgba(255, 223, 186)',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#333',
  };

  const imageStyles = {
    width: '300px', 
    height: 'auto', 
    marginBottom: '20px', 
  };

  return (
    <div style={mainStyles}>
      <img src={backgroundImg} alt="Imagen de fondo" style={imageStyles} />
      <h1>Vecinochef</h1>
      <h3>¡Sabores compartidos entre vecinos!</h3>
    </div>
  );
}

export default Main;
