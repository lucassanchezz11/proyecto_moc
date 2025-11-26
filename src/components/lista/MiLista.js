import React, {useState} from "react";

function MiLista(props){

    return(
        <div className='container mt-3 text-light'>
            <ul>
                {
                    props.incidencias.map((i)=> (
                        <li key={i.id} className="mb-4 pb-2 border-bottom">
                            
                            <strong>ID incidencia:</strong> {i.id} <br></br>
                            <strong>Titulo: </strong>{i.titulo}<br></br>
                            <strong>Usuario: </strong>{i.usuario.email}<br></br>
                            <strong>Descripcion: </strong>{i.descripcion}<br></br>
                            <strong>Categoria: </strong>{i.categoria}<br></br>
                            <strong>Nivel de urgencia: </strong>{i.nivel_urgencia}<br></br>
                            <strong>Fecha de registro: </strong>{i.fecha_registro}<br></br>
                            <strong>Estado: </strong>{i.estado}<br></br>
                            <strong>Ubicacion: </strong>{i.ubicacion}<br></br>
                            
                        </li>
                        
                    ))

                }
            </ul>
        </div>
    );
}

export default MiLista;