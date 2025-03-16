import { response } from 'express';
import Task from '../models/task.mjs';
import Response from '../helper/response.mjs';
import { generateToken, validateToken } from '../helper/jwt.mjs';

/**
 * Crea una tarea.
 *
 * @param {Object} req - Request del cliente.
 * @param {Object} res - Response del servidor.
 *
 * @returns {Promise<Response>} - Un objeto Response con la respuesta del servidor.
 * @throws {Error} - Si hay un error al registrar la tarea.
 */
export const createTask = async (req, res = response) => {
    const { body, headers } = req;
    if (!body.title || !body.description) return res.status(400).send(Response(false, 'Error en la estructura de datos', null, null));

    let validateTokenUser;
    try {
        validateTokenUser = validateToken(headers);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al validar el token', error, null));
    }
    if (!validateTokenUser.success) {
        return res.status(401).send(Response(false, 'Error al validar el token', null, null));
    }
    const dateNow = new Date();
    const { token, data: { data: { username } } } = validateTokenUser;

    const { title, description } = body;

    const taskExists = await Task.findOne({ username, title, description, created_at: dateNow });

    if (taskExists) return res.status(400).send(Response(false, 'La tarea ya existe', null, null));

    let taskNew;
    try {
        taskNew = await Task.create({ user: username, title, description, created_at: dateNow, updated_at: dateNow });
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al registrar la tarea', error, null));
    }

    return res.status(201).send(Response(true, 'Tarea creada', taskNew, token));
};

/**
 * Retrieves a list of tasks for the authenticated user.
 * 
 * Validates the user token from the request headers to ensure the user
 * is authenticated. If the token is valid, it retrieves all tasks
 * associated with the username extracted from the token. Returns a
 * success response with the list of tasks or an error response if
 * token validation fails or if there is an issue retrieving tasks.
 * 
 * @param {object} req - The request object containing headers.
 * @param {object} res - The response object to send the results.
 */

export const listTask = async (req, res = response) => {
    const { headers } = req;
    let validateTokenUser;
    try {
        validateTokenUser = validateToken(headers);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al validar el token', error, null));
    }
    if (!validateTokenUser.success) return res.status(401).send(Response(false, 'Error al validar el token', null, null));
    const { token, data: { data: { username } } } = validateTokenUser;

    let tasks;
    try {
        tasks = await Task.find({ username });
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al obtener las tareas', error, null));
    }
    return res.status(200).send(Response(true, 'Tareas obtenidas', tasks, token));
};

/**
 * Deletes a task from the database.
 * 
 * Validates the user token from the request headers to ensure the user
 * has permission to delete the task. Checks if the task ID is provided and
 * if the task exists. Deletes the task if it belongs to the user.
 * 
 * @param {Object} req - The HTTP request object, containing headers and params.
 * @param {Object} res - The HTTP response object.
 * 
 * @returns {Object} - HTTP response indicating the success or failure of the operation.
 * 
 * @throws {Error} - If there's an error validating the token, retrieving, or deleting the task.
 */

export const deleteTask = async (req, res = response) => {
    const { headers, query } = req;
    let validateTokenUser;
    try {
        validateTokenUser = validateToken(headers);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al validar el token', error, null));
    }
    if (!validateTokenUser.success) return res.status(401).send(Response(false, 'Error al validar el token', null, null));
    const { token, data: { data: { username } } } = validateTokenUser;
    if (!query.id) return res.status(400).send(Response(false, 'Error en la estructura de datos', null, null));
    const { id } = query;
    let taskExists;
    try {
        taskExists = await Task.findById(id);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al obtener la tarea', error, null));
    }
    if (!taskExists) return res.status(400).send(Response(false, 'La tarea no existe', null, null));

    if (taskExists.user !== username) return res.status(400).send(Response(false, 'La tarea no pertenece a este usuario', null, null));
    let deleteTask;
    try {
        deleteTask = await Task.findByIdAndDelete(id);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al eliminar la tarea', error, null));
    }
    return res.status(200).send(Response(true, 'Tarea eliminada', null, token));
}

/**
 * Updates an existing task in the database.
 * 
 * Validates the user token from the request headers and ensures the user
 * has permission to update the task. Checks if the task ID is provided and
 * if the task exists. Updates the task with new information from the request
 * body if the task belongs to the user.
 * 
 * @param {Object} req - The HTTP request object, containing headers, params, and body.
 * @param {Object} res - The HTTP response object.
 * 
 * @returns {Object} - HTTP response indicating the success or failure of the operation.
 * 
 * @throws {Error} - If there's an error validating the token, retrieving, or updating the task.
 */

export const updateTask = async (req, res = response) => {
    const { headers, query, body } = req;
    let validateTokenUser;
    try {
        validateTokenUser = validateToken(headers);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al validar el token', error, null));
    }
    if (!validateTokenUser.success) return res.status(401).send(Response(false, 'Error al validar el token', null, null));

    const { token, data: { data: { username } } } = validateTokenUser;

    if (!query.id) return res.status(400).send(Response(false, 'Error en la estructura de datos', null, null));

    const { id } = query;
    if (!body.title && !body.description) return res.status(400).send(Response(false, 'Error en la estructura de datos', null, null));
    const { title, description } = body;

    let taskExists;
    try {
        taskExists = await Task.findById(id);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al obtener la tarea', error, null));
    }
    if (!taskExists) return res.status(400).send(Response(false, 'La tarea no existe', null, null));
    if (taskExists.user !== username) return res.status(400).send(Response(false, 'La tarea no pertenece a este usuario', null, null));

    let updateTask;
    try {
        updateTask = await Task.findByIdAndUpdate(id, { title, description, updated_at: new Date() }, { new: true });
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al actualizar la tarea', error, null));
    }
    return res.status(200).send(Response(true, 'Tarea actualizada', updateTask, token));
}