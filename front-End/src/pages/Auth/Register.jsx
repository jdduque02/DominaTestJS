// components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../logoMain.png';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    // Simulamos un registro exitoso
    console.log('Registrando usuario:', username,password);
    // Redirigimos a la vista de tareas
    navigate('/tasks');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-fund">
      <img src={logo} className="absolute top-[15%]" alt="logo"/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary-domina">Regístrate</h1>
        <form onSubmit={registerUser}>
          <fieldset className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2  text-primary-domina">Usuario</label>
            <input type="text"  
              className="w-full px-3 py-2 border rounded-lg focus:outline-none border-secondary-domina text-primary-domina"   value={username} onChange={(e) => setUsername(e.target.value)}
              required
              id="username" 
              placeholder="Ingresa tu usuario" 
            />
          </fieldset>
          <fieldset className="mb-6">
            <label htmlFor="password" className="block text-sm font-bold mb-2  text-primary-domina">Contraseña</label>
            <input type="password"  className="w-full px-3 py-2 border rounded-lg focus:outline-none border-secondary-domina text-primary-domina" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password" 
              placeholder="Ingresa tu contraseña" 
              required
            />
          </fieldset>
          <button type="submit" className="w-full py-2 rounded-lg font-semibold bg-secondary-domina text-primary-domina hover:text-white">Registrarse</button>
        </form>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta? {' '}<Link to="/login" className="text-primary-domina-light hover:underline">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;