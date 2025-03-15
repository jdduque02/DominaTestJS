import bcrypt from 'bcrypt';
import { response } from 'express';
import User from '../models/user.mjs';
import Response from '../helper/response.mjs';
import { generateToken, validateToken } from '../helper/jwt.mjs';
const { HASH_KEY_USER } = process.env;

/**
 * Crea un nuevo usuario en la base de datos
 * 
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Objeto de respuesta HTTP con el usuario creado.
 * 
 * @throws {ValidationError, ResourceNotFoundError, QueryErrors} Error al crear usuario.
 */
export const createUser = async (req, res = response) => {
    const { body } = req;
    if (!body.username || !body.password) return res.status(400).send(Response(false, 'Error en la estructura de datos', null, null));
    const { username, password } = body;
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).send(Response(false, 'El usuario ya existe', null, null));
    let salt;
    try {
        salt = bcrypt.genSaltSync(15);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al generar la encriptacion', error, null));
    }
    let hash;
    try {
        hash = bcrypt.hashSync(password, salt, 15, HASH_KEY_USER);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al generar la contraseña ', error, null));
    }
    let userNew;
    try {
        userNew = await User.create({ username, password: hash });
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al registrar el usuario', error, null));
    }
    let getToken;
    try {
        getToken = generateToken(userNew);
    } catch (error) {
        return res.status(500).send(Response(false, 'error al generar el token', error, null));
    }
    if (userNew) return res.status(201).send(Response(true, 'Usuario creado exitosamente', userNew, getToken));
    return res.status(400).send(Response(false, 'Error al crear el usuario', null, null));
}

/**
 * Inicia sesion de un usuario en la base de datos
 * 
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * 
 * @returns {Object} - Objeto de respuesta HTTP con el token del usuario.
 * 
 * @throws {ValidationError, ServerError, ResourceNotFoundError, AuthenticationError, AuthorizationError, QueryErrors} Error al iniciar sesion.
 */
export const loginUser = async (req, res = response) => {
    const { body: { username, password } } = req;
    const userExists = await User.findOne({ username });
    if (!userExists) return res.status(400).send(Response(false, 'El usuario no existe', null, null));

    let validateLogin;
    try {
        validateLogin = await bcrypt.compare(password, userExists.password);
    } catch (error) {
        return res.status(500).send(Response(false, 'Error al iniciar sesion', error, null));
    }
    if (!validateLogin) return res.status(401).send(Response(false, 'Contraseña incorrecta', null, null));

    let getToken;
    try {
        getToken = generateToken(userExists);
    } catch (error) {
        return res.status(500).send(Response(false, 'error al generar el token', error, null));
    }

    return res.status(200).send(Response(true, 'Inicio de sesion exitoso', null, getToken));
}