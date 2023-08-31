import {createContext, useEffect, useState} from "react";
import service from "../services/service.config";

const AuthContext= createContext()


function AuthWrapper(props){

//...
const [isUserActive, setIsUserActive]= useState(false)
const [activeUserId, setActiveUserId] = useState(null)
const [isPageLoading, setIsPageLoading]= useState(true)

useEffect(()=>{
   verifyToken() 

},[])

const verifyToken = async ()=>{


    //al inicio de la funcion podemos mostrar el spinner

    setIsPageLoading(true)

    try {
        const response = await service.get("/auth/verify")
        console.log(response)
        setIsUserActive(true)
        setActiveUserId(response.data._id)
        setIsPageLoading(false)
        
    } catch (error) {
        console.log(error)
        setIsUserActive(false)
        setActiveUserId(null)
        setIsPageLoading(false)
        
    }
}
    const passedContext = {
        verifyToken,//para validar token en login, volver a la app o logout
        isUserActive,//mostrar enlaces dependiendo de si el user está logueado, ver paginas 
        activeUserId //mostrar funcionalidades de borrar/editar cuando el user sea dueño del documento
    }

    //Claúsula de guardia para toda la página
    if(isPageLoading===true){

        return <h3>...validando credenciales</h3>
    }

    return(
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {

    AuthContext,
    AuthWrapper
}