// src/controllers/ciudadano.controller.js
import { ciudadanoService } from '../services/ciudadano.service.js';

export async function createCiudadano(req, res, next) {
  try {
    const nuevo = await ciudadanoService.crear(req.body, req.file);
    res.status(201).json(nuevo);
  } catch (error) {
    next(error); // Pasamos el error al manejador central
  }
}

export async function listCiudadanos(req, res, next) {
  try {
    const lista = await ciudadanoService.obtenerTodos();
    res.json(lista);
  } catch (error) {
    next(error);
  }
}

export async function getCiudadano(req, res, next) {
  try {
    const item = await ciudadanoService.obtenerPorId(req.params.id);
    res.json(item);
  } catch (error) {
    // Podríamos manejar errores específicos aquí si quisiéramos
    if (error.message === 'Ciudadano no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
}

export async function getByCodigo(req, res, next) {
  try {
    const item = await ciudadanoService.obtenerPorCodigo(req.params.codigo);
    res.json(item);
  } catch (error) {
    if (error.message === 'Ciudadano no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
}

export async function updateCiudadano(req, res, next) {
  try {
    const item = await ciudadanoService.actualizar(req.params.id, req.body, req.file);
    res.json(item);
  } catch (error) {
    if (error.message === 'Ciudadano no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
}

export async function deleteCiudadano(req, res, next) {
  try {
    const resultado = await ciudadanoService.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    if (error.message === 'Ciudadano no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
}