import React from 'react';

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const task = {
      title: formData.get('title'),
      description: formData.get('description'),
    };
    onSubmit(task); // Envía los datos al componente padre
    onClose(); // Cierra el modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Registrar Nueva Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:border-secondary-domina"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:border-secondary-domina"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-primary-domina hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none "
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary-domina hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none "
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;