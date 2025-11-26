import React, { useState } from "react";
import "./form.css";

function Form(props) {

    // Campos del formulario gestionados con useState
    const [titulo, setTitulo] = useState("");
    const [usuario, setUsuario] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [nivel, setNivel] = useState("");
    const [ubicacion, setUbicacion] = useState("");

    const envioFormulario = (event) => {
        event.preventDefault();

        // Llamada al método del componente padre
        props.agregarIncidencia(
            titulo,
            usuario,
            descripcion,
            categoria,
            nivel,
            ubicacion
        );

        // Limpiar formulario
        setTitulo("");
        setUsuario("");
        setDescripcion("");
        setCategoria("");
        setNivel("");
        setUbicacion("");
    };

    return (
        <div>
            <h2>Registrar incidencias</h2>

            <form onSubmit={envioFormulario}>

                <div className="elemento-form">
                    <label>Título:</label>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Introduce el título"
                        required
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>

             
                <div>
                    <label className="mb-3 form-label">Email</label>
                    <input 
                        className="mb-3 form-control" 
                        type="email" name="email" 
                        required
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}></input><br/><br/>
                </div>

                <div className="elemento-form">
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Introduce la descripción"
                        required
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <div className="elemento-form">
                    <label>Categoría:</label>
                    <select
                        name="categoria"
                        required
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccionar...</option>
                        <option>Hardware</option>
                        <option>Software</option>
                        <option>Conectividad</option>
                        <option>Usuarios</option>
                        <option>Infraestructura</option>
                    </select>
                </div>

                <div className="elemento-form">
                    <label>Nivel de urgencia:</label>
                    <select
                        name="nivel"
                        required
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                    >
                        <option value="">Seleccionar...</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                    </select>
                </div>

                <div className="elemento-form">
                    <label>Ubicación:</label>
                    <input
                        type="text"
                        name="ubicacion"
                        placeholder="Ej: B205"
                        required
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-success mx-auto d-grid bg-danger border-warning">
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default Form;
