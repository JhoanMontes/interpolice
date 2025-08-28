// src/routes/auth.routes.js
import { Router } from 'express';
import { login, seedAdmin } from '../controllers/auth.controller.js';

const route = Router();

route.post('/login', login);
route.post('/seed-admin', seedAdmin);

export default route; 
