import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {format} from 'date-fns';


import { AuthContext } from '../../context/AuthContext';

import TaskModal from '../../components/TaskModal';
import Loading from '../../components/Loading';

import btnTrash from '../../bx-trash.svg';
import btnEdit from '../../bxs-pencil.svg';
import btnAdd from '../../bxs-add-to-queue.svg'
import btnLogout from '../../bx-log-out.svg'
import btnSave from '../../bx-check-circle.svg'

const BASE_URL_API_SERVICE_TASK = process.env.REACT_APP_BASE_URL_API_SERVICE_TASK || 'http://localhost:5001/api'  ;

function TaskList() {
  const { logout } = useContext(AuthContext);
  const [list, setListTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Cargar las tareas cuando el componente se monta
  useEffect(() => {
      const getListTasks = async () => {
        try {
          const response = await axios.get(`${BASE_URL_API_SERVICE_TASK}/task`, {
            headers: { 'X-Access-Token': localStorage.getItem('token') },
          });
    
          if (!response.data.success || response.status !== 200) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.data.message,
            });
            return response.data.message;
          }
    
          if (response.status === 200 && response.data.success) {
            setListTasks(response.data.data); // Asegúrate de que response.data.data sea un array
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response.data.message || 'Error al obtener las tareas',
            });
          }
        } catch (error) {
          console.error('Error fetching tasks:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar la lista de tareas',
          });
          setListTasks([]); // Limpia la lista de tareas en caso de error
        }
    
        // Programar la próxima ejecución en 30 segundos
        setTimeout(getListTasks, 10000);
      };
    
      // Ejecutar la función inmediatamente al montar el componente
      getListTasks();
    
      // Limpiar el timeout cuando el componente se desmonte
      return () => clearTimeout(getListTasks);
  }, []); // Dependencias vacías para que solo se ejecute al montar y desmontar
  const dateFormat = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');

  const createTask = async (task) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL_API_SERVICE_TASK}/task`, task, {
        headers: { 'X-Access-Token': localStorage.getItem('token') },
      });
      
      if (!response.data.success || response.status !== 201) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
        return response.data.message;
      }
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
      setIsLoading(false);
    }
  };

  const DeleteTask = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${BASE_URL_API_SERVICE_TASK}/task/?id=${id}`, {
        headers: { 'X-Access-Token': localStorage.getItem('token') },
      });
      if (!response.data.success || response.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
        setIsLoading(false);
        return response.data.message;
      }
      
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
      setIsLoading(false);
      return error.message;
    }
  };

  const UpdateTask = async (task) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL_API_SERVICE_TASK}/task/?id=${task._id}`, task, {
        headers: { 'X-Access-Token': localStorage.getItem('token') },
      });
      console.log({response});
      if (!response.data.success || response.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
        setIsLoading(false);
        return response.data.message;
      }
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Tarea actualizada correctamente',
      });
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-[5%] text-slate-300 text-2xl">
      <Loading isLoading={isLoading} />
      <div className="w-full mb-8 flex justify-between items-center pl-4 gap-4">
          {/* Título y botón de agregar tarea */}
          <div className="flex items-center gap-4">
            <h1 className="text-center text-black font-bold">Listado de Tareas</h1>
            <button
              className=" hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
              type="button"
            >
              <img src={btnAdd} alt="Agregar" className="w-6 h-6" />
            </button>
          </div>

          {/* Botón de cerrar sesión */}
          <button
            type="button"
            className=" hover:bg-red-600 text-white font-semibold rounded flex items-center justify-center p-2 mr-4"
            onClick={logout}
          >
            <img src={btnLogout} alt="" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
          {list.length > 0 ? (
            list.map((task) => (
              <div key={task._id} className="bg-slate-100 p-4 rounded-lg shadow-md border border-gray-300 grid grid-cols-2 gap-4">
                {/* Título */}
                <p className="text-sm font-semibold text-blue-500">Título:</p>
                <input className="text-gray-600 text-sm bg-slate-200 p-2 rounded-sm focus:bg-slate-300 focus:border-secondary-domina"
                  disabled={taskToEdit !== task._id} // Deshabilitado si no está en edición
                  type="text"
                  value={task.title}
                  onChange={(e) => {
                    // Actualiza el título de la tarea en el estado
                    const updatedTask = { ...task, title: e.target.value };
                    const updatedList = list.map((t) => (t._id === task._id ? updatedTask : t));
                    setListTasks(updatedList);
                  }}
                />

                {/* Descripción */}
                <p className="text-blue-500 text-sm font-semibold">Descripcion:</p>
                <textarea
                  className="text-gray-600 text-sm bg-slate-200 p-2 rounded-sm focus:border-secondary-domina"
                  disabled={taskToEdit !== task._id} // Deshabilitado si no está en edición
                  value={task.description}
                  onChange={(e) => {
                    // Actualiza la descripción de la tarea en el estado
                    const updatedTask = { ...task, description: e.target.value };
                    const updatedList = list.map((t) => (t._id === task._id ? updatedTask : t));
                    setListTasks(updatedList);
                  }}
                />

                {/* Fechas */}
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-blue-500">Fecha de creación:</span> <br /> {dateFormat(task.created_at)}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-blue-500">Fecha de Actualización:</span> <br /> {dateFormat(task.updated_at)}
                </p>

                {/* Botones */}
                {taskToEdit === task._id ? (
                  // Botón "Guardar Cambios" (visible solo en modo edición)
                  <button
                    type="button"
                    onClick={() => {
                      UpdateTask(task); // Llama a la función para actualizar la tarea
                      setTaskToEdit(null); // Desactiva el modo edición
                    }}
                    className=" hover:bg-green-300 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                  >
                    <img src={btnSave} alt="" />
                  </button>
                ) : (
                  // Botón "Editar" (visible solo fuera del modo edición)
                  <button
                    type="button"
                    onClick={() => setTaskToEdit(task._id)} // Activa el modo edición
                    className=" hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                  >
                    <img src={btnEdit} alt="Editar" className="w-6 h-6" />
                  </button>
                )}

                {/* Botón "Eliminar" */}
                <button
                  type="button"
                  onClick={() => DeleteTask(task._id)}
                  className=" hover:bg-red-600 text-white font-semibold py-2 px-4 rounded flex items-center justify-center"
                >
                  <img src={btnTrash} alt="Eliminar" className="w-6 h-6" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No hay tareas disponibles.</p>
          )}
        </div>
      {/* Modal para registrar tareas */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createTask}
      />
    </div>
  );
}

export default TaskList;