import './App.css'
import Navbar from "./components/Navbar"
import {Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from './pages/Login'
import Main from "./pages/Main"
import MyProfile from "./pages/MyProfile"
import Error from "./pages/Error"
import NotFound from "./pages/NotFound"
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';


import IsPrivate from './components/IsPrivate'
import AddEspecialidad from './pages/AddEspecialidad'
import EditEspecialidad from './pages/EditEspecialidad'
import EditProfile from './pages/EditProfile'

import AddMenu from "./pages/AddMenu"
import EspecialidadesList from './pages/EspecialidadesList'
import EditMenu from './pages/EditMenu'
import UserProfile from './pages/UserProfile'


function App() {

  return (
    <>
     
    <Navbar/>

    <Routes>

      <Route path="/" element={<Main/>}/>
      <Route path="/login" element= {<Login/>}/>
      <Route path="/signup" element= {<Signup/>}/>

      <Route path="/user/myprofile" element= {<IsPrivate><MyProfile/></IsPrivate>}/>
      <Route path="/user/edit-profile/:userId" element= {<IsPrivate><EditProfile/></IsPrivate>}/>
      <Route path="/user/user-profile/:userId" element= {<IsPrivate><UserProfile/></IsPrivate>}/>


      <Route path="/menu/home" element = {<IsPrivate><Home/></IsPrivate>}/>
      <Route path="/menu/add-menu" element = {<IsPrivate><AddMenu/></IsPrivate>}/>
      <Route path="/menu/edit-menu/:id" element = {<IsPrivate><EditMenu/></IsPrivate>}/>

      <Route path="/esp/especialidades" element = {<IsPrivate><EspecialidadesList/></IsPrivate>}/>
      <Route path="/esp/add-especialidad" element = {<IsPrivate><AddEspecialidad/></IsPrivate>}/>
      <Route path="/esp/edit-especialidad/:id" element = {<IsPrivate><EditEspecialidad/></IsPrivate>}/>
      
      <Route path="/error" element = {<Error/>} />
      <Route path="*" element = {<NotFound/>}/>

    </Routes>

    </>
  )
}

export default App
