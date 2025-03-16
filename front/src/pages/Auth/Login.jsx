// components/Login.js
import React, { useState, useContext  } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../logoMain.png';
import Loading from '../../components/Loading';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const loginUser  = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            await login({ username, password });
        } catch (error) {
            setError(error);
        }
        console.log(((localStorage.getItem('isAuthenticated') === 'true') || (localStorage.getItem('isAuthenticated'))));
        if ((localStorage.getItem('isAuthenticated') === 'true') || (localStorage.getItem('isAuthenticated'))) {
            navigate('/tasks');
            window.location.href = '/tasks';
        }
        setIsLoading(false);
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            timer: 10000,
            text: 'Credenciales incorrectas',
            timerProgressBar: true, // Muestra una barra de progreso
            showConfirmButton: false // Oculta el botón de confirmación
        })
        
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-fund" >
            <Loading isLoading={isLoading} />
            <img src={logo} className="absolute top-[15%] left-[44%]" alt="logo"/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
                <h1 className="text-2xl font-bold mb-6 text-center text-black"> Iniciar Sesión </h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form>
                    <fieldset className="mb-4">
                    <label htmlFor="username" className="block text-sm font-bold mb-2  text-black">Usuario</label>
                    <input
                    type="text" 
                    id="username" 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-domina text-black" 
                    placeholder="Ingresa tu usuario" 
                    value={username} 
                    required
                    onChange={(e) => setUsername(e.target.value)} />
                    </fieldset>
                    <fieldset className="mb-6">
                    <label htmlFor="password" className="block text-sm font-bold mb-2 text-black">Contraseña</label>
                    <input type="password" required id="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none  focus:border-secondary-domina text-primary-domina" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
