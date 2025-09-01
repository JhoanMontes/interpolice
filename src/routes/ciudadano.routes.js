// src/routes/ciudadano.routes.js
import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import { hasRole } from '../middlewares/roles.js';
import { upload } from '../middlewares/upload.js';
import {
  createCiudadano,
  listCiudadanos,
  getCiudadano,
  getByCodigo,
  updateCiudadano,
  deleteCiudadano
} from '../controllers/ciudadano.controller.js';
import { crearCiudadanoValidator, actualizarCiudadanoValidator } from '../middlewares/validators/ciudadano.validator.js';

const r = Router();

r.get('/', authRequired, listCiudadanos);
r.get('/codigo/:codigo', getByCodigo); // público (para QR)
r.get('/:id', authRequired, getCiudadano);

r.post('/',
  authRequired,
  upload.single('foto'),
  crearCiudadanoValidator,
  createCiudadano
);
r.put('/:id',
  authRequired,
  hasRole('admin', 'policia'),
  upload.single('foto'),
  actualizarCiudadanoValidator,
  updateCiudadano
);
r.delete('/:id', authRequired, hasRole('admin'), deleteCiudadano);


export default r;
