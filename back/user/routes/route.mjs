import { Router } from 'express';
import { createUser, loginUser } from '../controllers/user.mjs';
const RouterUser = Router();

RouterUser.post('/register', createUser);
RouterUser.post('/login', loginUser);

export default RouterUser;