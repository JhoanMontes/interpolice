// src/controllers/auth.controller.js
import { authService } from '../services/auth.service.js';

export async function seedAdmin(req, res, next) {
  try {
    const resultado = await authService.seedAdmin();
    res.json(resultado);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const resultado = await authService.login(email, password);
    res.json(resultado);
  } catch (error) {
    // Errores de credenciales son un 400 o 401, no un 500
    if (error.message === 'Credenciales inválidas') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
}