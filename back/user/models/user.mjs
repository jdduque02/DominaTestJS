import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Ingrese un usuario'],
        maxlength: [50, 'El usuario no puede tener más de 50 caracteres'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor ingrese una contraseña'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
}, { versionKey: false });

export default model('User', userSchema);