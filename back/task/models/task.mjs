import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, required: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

export default model('Task', taskSchema);
