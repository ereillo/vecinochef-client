import React from 'react';
import backgroundImg from "../imagenes/yesrc/imagenes/yellow-chef-hat-logo-illustration-isolated-white-background_691771-203.avif"

function Main() {
  const mainStyles = {
    backgroundSize: 'cover', 
    minHeight: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(rgba(255, 215, 0, 0.8), rgba(255, 215, 0, 0.8)), rgba(255, 223, 186)', 
    color: '#333', 
  };

  return (
    <div style={mainStyles}>
      <h1>Vecinochef</h1>
      <h3>¡Sabores compartidos entre vecinos!</h3>
    </div>
  );
}

export default Main;
