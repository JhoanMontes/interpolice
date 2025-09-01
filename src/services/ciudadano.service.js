// src/services/ciudadano.service.js
import { Ciudadano } from '../models/index.js';
import { generarQR } from '../utils/qr.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';


async function generarYGuardarQR(codigo) {
  const url = `${BASE_URL}/api/ciudadanos/codigo/${encodeURIComponent(codigo)}`;
  const qrPath = await generarQR(url, `ciudadano-${codigo}`);
  return `/${qrPath.replace(/\\/g, '/')}`;
}

export const ciudadanoService = {
  async crear(datos, archivo) {
    if (archivo) {
      datos.foto = `/${archivo.path.replace(/\\/g, '/')}`;
    }
    datos.qr = await generarYGuardarQR(datos.codigo);
    const nuevoCiudadano = await Ciudadano.create(datos);
    return nuevoCiudadano;
  },

  async obtenerTodos() {
    return await Ciudadano.findAll({ order: [['id', 'DESC']] });
  },

  async obtenerPorId(id) {
    const ciudadano = await Ciudadano.findByPk(id);
    if (!ciudadano) throw new Error('Ciudadano no encontrado'); // Mejor manejo de errores
    return ciudadano;
  },

  async obtenerPorCodigo(codigo) {
    const ciudadano = await Ciudadano.findOne({ where: { codigo } });
    if (!ciudadano) throw new Error('Ciudadano no encontrado');
    return ciudadano;
  },

  async actualizar(id, datos, archivo) {
    const ciudadano = await this.obtenerPorId(id); // Reutilizamos la búsqueda

    if (archivo) {
      datos.foto = `/${archivo.path.replace(/\\/g, '/')}`;
    }
    if (datos.codigo && datos.codigo !== ciudadano.codigo) {
      datos.qr = await generarYGuardarQR(datos.codigo);
    }

    await ciudadano.update(datos);
    return ciudadano;
  },

  async eliminar(id) {
    const ciudadano = await this.obtenerPorId(id);
    await ciudadano.destroy();
    return { ok: true };
  }
};