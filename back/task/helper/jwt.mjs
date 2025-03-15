import jwt from 'jsonwebtoken';
import Response from '../helper/response.mjs';

const { HASH_KEY_JWT } = process.env;

/**
 * Middleware that validates a token in the request headers.
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express middleware function.
 * @returns {undefined}
 * @throws {Error} if the token is invalid or does not exist.
 */
export const validateToken = (headers) => {
    const token = headers['x-access-token'];
    if (!token) return Response(false, 'token no encontrado', null, null);
    let verfyToken;
    try {
        verfyToken = jwt.verify(token, HASH_KEY_JWT);
    } catch (error) {
        return Response(false, 'Error al generar el token', error, null);
    }
    if (!verfyToken) return Response(false, 'token no valido', null, null)
    let { data, iat } = verfyToken;
    let today = new Date();
    today.setUTCHours(today.getUTCHours() - 5);
    if (iat <= today.getTime()) {
        return Response(false, 'token expirado', null, null);
    }
    let expiresIn = today.setUTCHours(today.getUTCHours() + 2);
    let charge = {
        data,
        expiresIn,
        iat
    };
    let newToken;
    try {
        newToken = jwt.sign(charge, HASH_KEY_JWT);
    } catch (error) {
        return Response(false, 'Error al generar el token', error, null);
    }
    return { charge, token: newToken };
}

export const generateToken = (user) => {
    const charge = {
        data: {
            id: user._id,
            username: user.username
        },
        expiresIn: '1h',
        iat: new Date()
    }
    let generateToken;
    try {
        generateToken = jwt.sign(charge, HASH_KEY_JWT);
    } catch (error) {
        return Response(false, 'Error al generar el token', error, null);
    }
    return Response(true, 'Inicio de sesion exitoso', null, generateToken);
}
