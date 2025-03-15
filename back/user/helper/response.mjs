export default function Responses(status, message, data, token) {
    return ({
        success: status,
        message: message,
        data,
        token
    });
}