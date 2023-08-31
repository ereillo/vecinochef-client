import './App.css'
import Navbar from "./components/Navbar"
import {Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from './pages/Login'
import Main from "./pages/Main"
import MyProfile from "./pages/MyProfile"
import Error from "./pages/Error"
import NotFound from "./pages/NotFound"

import IsPrivate from './components/isPrivate'


function App() {

  return (
    <>
     
    <Navbar/>

    <Routes>

      <Route path="/" element={<Main/>}/>
      <Route path="/login" element= {<Login/>}/>
      <Route path="/signup" element= {<Signup/>}/>
      <Route path="/myprofile" element= {<IsPrivate><MyProfile/></IsPrivate>}/>

      
      <Route path="/error" element = {<Error/>} />
      <Route path="*" element = {<NotFound/>}/>

    </Routes>

    </>
  )
}

export default App
