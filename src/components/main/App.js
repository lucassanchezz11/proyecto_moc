import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import MiLista from "../lista/MiLista";
import Form from "./Form";
import Fondo from '../../img/Fondo.jpg';

function App() {
    //Definir la URL de la API para las incidencias (si JSON se ejecuta en el puerto 3004)
  const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
  //Definir la URL de la API para los usuarios (si JSON se ejecuta en el puerto 3004)
  const USUARIO_API_URL = 'http://localhost:3004/users';

  const [usuarios, setUsuarios] = useState([ ]);
  const [incidencias, setIncidencias] = useState([ ]);

  useEffect(()=>{
    const obtenerIncidencias = async () => {
  try {
    let response = await fetch(INCIDENCIA_API_URL);
    if (!response.ok) {
      throw new Error("HTTP Error");
    }
    const data = await response.json();
    console.log(data);
    setIncidencias(data);
  } catch (e) {
    console.error("Error al cargar las incidencias:", e);
  }
}
const obtenerUsuarios = async () => {
  try {
    let response = await fetch (USUARIO_API_URL);
    if(!response.ok){
      throw new Error("HTTP Error");
    }
    const data = await response.json();
    console.log(data);
    setUsuarios(data);
  } catch(e){
    console.error("Error al cargar las incidencias:", e);
  }
}
obtenerIncidencias();
obtenerUsuarios();
  },[]);

    // Método adaptado a Hooks
    const agregarIncidencia = async (titulo_nuevo, usuario_nuevo, descripcion_nuevo, categoria_nueva, nivelurgencia_nueva, ubicacion_nueva) => {
  try {
    // Lógica para formatear la fecha
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const fecha_formateada = year + "-" + month + "-" + day;

    // Buscar el usuario y crear la incidencia
    let usuarioEncontrado = usuarios.find((u)=>u.email === usuario_nuevo);
    if(usuarioEncontrado){
      const nueva_incidencia = {
        usuario: usuarioEncontrado,
        titulo: titulo_nuevo,
        descripcion: descripcion_nuevo,
        categoria: categoria_nueva,
        nivel_urgencia: nivelurgencia_nueva,
        fecha_registro: fecha_formateada, // El comentario sugiere usar new Date().toISOString()
        ubicacion: ubicacion_nueva,
        estado: "Abierta",
        comentarios: []
      };

      // Petición POST a la API
      let response = await fetch(INCIDENCIA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nueva_incidencia)
      });

      if(!response.ok){
        throw new Error(`Fallo de la petición POST. Estado HTTP: ${response.status}`);
      }

      let data = await response.json();
      console.log("nueva incidencia: ", data);
      setIncidencias([...incidencias, data]); // Actualiza el estado de incidencias
    } else {
      alert("No se puede crear incidencia. Usuario no encontrado");
      throw new Error('Error al crear incidencia. Usuario no encontrado');
    }
  } catch(e){
    console.error("Falló la petición POST de la incidencia", e.message);
  }
    }

    return (
    <>
    <div className="card" style={{backgroundImage: `url(${Fondo})`, backgroundSize:"cover", backgroundRepeat: "no-repeat",color:"white"}}>
        <Header/>
        <h2 className='mb-4 text-center'>Mi aplicación</h2>
        <div className="container-fluid mt-4 row">
            <main className='col-md-6'>
                <p>Esta aplicación muestra el contenido almacenado de mi app:</p>
                <MiLista incidencias={incidencias}/>
            </main>

            <aside className='col-md-6'>
                <Form agregarIncidencia={agregarIncidencia}/>
            </aside>
        </div>
        <Footer/>
        </div>
        
    </>
);
}

export default App;
