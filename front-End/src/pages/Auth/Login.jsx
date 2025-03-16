// components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../logoMain.png';
const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const loginUser  = (e) => {
        e.preventDefault();
        // Simulamos un inicio de sesión exitoso
        console.log('Iniciando sesión con:', username, password);
        // Redirigimos a la vista de tareas
        navigate('/tasks');
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-fund" >
            <img src={logo} className="absolute top-[15%] left-[44%]" alt="logo"/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
                <h1 className="text-2xl font-bold mb-6 text-center text-black"> Iniciar Sesión </h1>
                <form>
                    <fieldset className="mb-4">
                    <label htmlFor="username" className="block text-sm font-bold mb-2  text-black">Usuario</label>
                    <input
                    type="text" 
                    id="username" 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-black text-black" 
                    placeholder="Ingresa tu usuario" 
                    value={username} 
                    required
                    onChange={(e) => setUsername(e.target.value)} />
                    </fieldset>
                    <fieldset className="mb-6">
                    <label htmlFor="password" className="block text-sm font-bold mb-2 text-black">Contraseña</label>
                    <input type="password" required id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-black text-primary-domina" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </fieldset>
                    <button type="submit" className="w-full py-2 rounded-lg font-semibold bg-secondary-domina text-primary-domina hover:text-white" onClick={loginUser}>
                    Ingresar
                    </button>
                </form>
                <p className="text-center mt-4">
                    ¿No tienes una cuenta?{' '}<Link to="/register" className="text-primary-domina font-medium hover:underline">Regístrate</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
