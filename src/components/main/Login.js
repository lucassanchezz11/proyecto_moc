import { useState } from "react";
import './Login.css';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendFormLogin = (event) => {
        event.preventDefault();
        props.onLogin(email, password);
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2 className="login-title">Iniciar sesión</h2>
                <form onSubmit={sendFormLogin}>

                    <div className="login-field">
                        <label htmlFor="email" className="login-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="login-input"
                            id="email"
                            name="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password" className="login-label">Contraseña</label>
                        <input
                            type="password"
                            className="login-input"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Entrar</button>

                </form>
            </div>
        </div>
    );
}

export default Login;