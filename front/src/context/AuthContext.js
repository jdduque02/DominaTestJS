import React, { createContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

const BASE_URL_API_SERVICE_USER = process.env.REACT_APP_BASE_URL_API_SERVICE_USER || 'http://localhost:5000/api';
export const AuthProvider = ({ children }) => {
    const login = async (userData) => {
        try {
            // Realiza la llamada a la API y espera la respuesta
            const response = await axios.post(`${BASE_URL_API_SERVICE_USER}/login`, userData);
            if (!response.data.success || response.status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message,
                });
                return response.data.message;
            }
            // Si la respuesta es exitosa, actualiza el estado
            // Guarda el token en localStorage (si es necesario)
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('username', userData.username);
            return response
        } catch (errorLogin) {
            // Muestra una alerta de éxito
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorLogin.message,
            });
            // Maneja el error
            console.log('Error en el inicio de sesión:', errorLogin.message);
            // Restablece el estado de autenticación
            localStorage.setItem('isAuthenticated', false);
            return errorLogin.response.data.message;
        }
    };

    const register = async (userData) => {
        try {
            // Realiza la llamada a la API y espera la respuesta
            const response = await axios.post(`${BASE_URL_API_SERVICE_USER}/register`, userData);
            if (!response.data.success || response.status !== 201) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message,
                });
                return response.data.message;
            }
            let LoginUser;
            try {
                // eslint-disable-next-line no-unused-vars
                LoginUser = await login({ username: userData.username, password: userData.password });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message,
                });
                // Maneja el error
                console.log('Error en el inicio de sesión:', error.message);
                // Restablece el estado de autenticación

                localStorage.setItem('isAuthenticated', false);
                return error.response.data.message;
            }
        } catch (errorLogin) {
            // Maneja el error
            console.log('Error en el inicio de sesión:', errorLogin.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorLogin.response.data.message,
            });
            // Restablece el estado de autenticación

            localStorage.setItem('isAuthenticated', false);
            return errorLogin.response.data.message;
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};