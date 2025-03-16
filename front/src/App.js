import React from 'react';
import './App.css';
import './index.css'; // Importa Tailwind CSS
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import TaskList from './pages/Task/TaskList';

const App = () => {
  const isAuthenticated =  (localStorage.getItem('isAuthenticated') === 'true');
  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Ruta de registro */}
        <Route path="/register" element={<Register />} />

        {/* Ruta de listado de tareas (protegida) */}
        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
        />

        {/* Ruta por defecto (redirige a /login) */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};
export default App;
