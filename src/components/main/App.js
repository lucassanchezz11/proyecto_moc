import React, { useState, useEffect } from 'react';
import MiLista from '../lista/MiLista';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Form from './Form.js';
import Login from './Login.js';
import Fondo from '../../img/Fondo.jpg';

function App() {

    const INCIDENCIA_API_URL = 'http://localhost:3004/incidencias';
    const USUARIO_API_URL = 'http://localhost:3004/users';
    const LOGIN_API_URL = 'http://localhost:3004/login';

    const [usuarios, setUsuarios] = useState([]);
    const [incidencias, setIncidencias] = useState([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    // Cargar incidencias y usuarios
    useEffect(() => {

        const obtenerIncidencias = async () => {
            try {
                let response = await fetch(INCIDENCIA_API_URL);
                if (!response.ok) throw new Error("HTTP Error");
                const data = await response.json();
                setIncidencias(data);
            } catch (e) {
                console.error("Error al cargar incidencias:", e);
            }
        };

        const obtenerUsuarios = async () => {
            try {
                let response = await fetch(USUARIO_API_URL);
                if (!response.ok) throw new Error("HTTP Error");
                const data = await response.json();
                setUsuarios(data);
            } catch (e) {
                console.error("Error al cargar usuarios:", e);
            }
        };

        obtenerIncidencias();
        obtenerUsuarios();

    }, []);


    // Función onLogin - hace POST a /login con json-server-auth
    const onLogin = async (email, password) => {
        try {
            const response = await fetch(LOGIN_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": email, "password": password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setUsuarioLogueado(userData);
            } else {
                const errorData = await response.json();
                alert(`Fallo de autenticación. Error: ${response.status}: ${errorData}`);
            }
        } catch (e) {
            console.error("Error en el login:", e);
            alert("Error de conexión con el servidor.");
        }
    };


    // Agregar incidencia
    const agregarIncidencia = async (
        titulo_nuevo,
        usuario_nuevo,
        descripcion_nuevo,
        categoria_nuevo,
        nivelurgencia_nuevo,
        ubicacion_nuevo
    ) => {
        try {
            const fecha = new Date();
            const fecha_formateada = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;

            let usuarioEncontrado = usuarios.find(u => u.email === usuario_nuevo);

            if (!usuarioEncontrado) {
                alert("Usuario no encontrado");
                return;
            }

            const nueva_incidencia = {
                usuario: usuarioEncontrado,
                titulo: titulo_nuevo,
                descripcion: descripcion_nuevo,
                categoria: categoria_nuevo,
                nivel_urgencia: nivelurgencia_nuevo,
                fecha_registro: fecha_formateada,
                ubicacion: ubicacion_nuevo,
                estado: "Abierta",
                comentarios: []
            };

            let response = await fetch(INCIDENCIA_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nueva_incidencia)
            });

            if (!response.ok) {
                throw new Error(`Error POST: ${response.status}`);
            }

            const data = await response.json();
            setIncidencias([...incidencias, data]);

        } catch (e) {
            console.error("Error al crear la incidencia:", e);
        }
    };

    return (
        <>
            <Header />
            <div className="card border-0" style={{
                backgroundImage: `url(${Fondo})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh"
            }}>
                <h2 className="card-title mb-5 mt-4 text-center text-white bg-dark bg-opacity-75 p-3 mx-auto rounded" style={{ maxWidth: "600px" }}>
                    Panel de Control de Incidencias
                </h2>

                <div className="container-fluid mt-3 px-5">
                    <div className="row g-4">

                        {!usuarioLogueado ? (
                            <aside className="col-12">
                                <div className="bg-white bg-opacity-90 p-4 rounded shadow-lg">
                                    <Login onLogin={onLogin} />
                                </div>
                            </aside>
                        ) : (
                            <>
                                <aside className="col-lg-7 col-md-12">
                                    <div className="bg-white bg-opacity-90 p-4 rounded shadow-lg">
                                        <h4 className="text-info mb-4">
                                            <i className="bi bi-list-ul"></i> Listado de Incidencias Registradas
                                        </h4>
                                        <MiLista incidencias={incidencias} />
                                    </div>
                                </aside>

                                <main className="col-lg-5 col-md-12">
                                    <div className="bg-white bg-opacity-90 rounded shadow-lg">
                                        <Form agregarIncidencia={agregarIncidencia} />
                                    </div>
                                </main>
                            </>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;