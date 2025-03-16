import { Router } from 'express';
import { createTask, deleteTask, listTask, updateTask } from '../controllers/task.mjs';
const RouterTask = Router();

RouterTask.post('/task', createTask);
RouterTask.get('/task', listTask);
RouterTask.patch('/task/:id?', updateTask);
RouterTask.delete('/task/:id?', deleteTask);

export default RouterTask;
