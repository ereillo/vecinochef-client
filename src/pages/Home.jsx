import { useContext, useEffect, useState } from "react";
import AddEspecialidad from "../pages/AddEspecialidad";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context"

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home