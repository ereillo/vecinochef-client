import axios from "axios"

//aquí vamos a definir la base de las llamadas al servidor
//aquí agregamos información de autenticación en todas las llamadas

const service = axios.create({

    baseURL: import.meta.env.VITE_SERVER_URL

})

service.interceptors.request.use((config)=>{

    //buscar token
    const storedToken =localStorage.getItem("authToken")
       //lo añadimos a la config

    if(storedToken){
        config.headers.Authorization= `Bearer ${storedToken}`
    }

    //retornamos el config
    return config;


})

export default service

//en servicios, podemkos crear funciones
//que hagan las llamadas al backend

//en  nuestro caso, usaremos service para definir la base de las llamadsas v