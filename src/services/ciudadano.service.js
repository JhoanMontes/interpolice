// src/services/ciudadano.service.js
import { Op } from 'sequelize';
import { Ciudadano } from '../models/index.js';
import { generarQR } from '../utils/qr.js';
import ApiError from '../utils/ApiError.js';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';


async function generarYGuardarQR(codigo) {
  const url = `${BASE_URL}/api/ciudadanos/codigo/${encodeURIComponent(codigo)}`;
  const qrPath = await generarQR(url, `ciudadano-${codigo}`);
  return `/${qrPath.replace(/\\/g, '/')}`;
}

export const ciudadanoService = {
  async crear(datos, archivo) {
    const { codigo, email } = datos;

    
    const duplicado = await Ciudadano.findOne({
      where: { [Op.or]: [{ codigo }, { email }] }
    });

    if (duplicado) {
      throw new ApiError('El código o el email ya se encuentran registrados.', 409); 
    }


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
    if (!ciudadano) {
      throw new ApiError('Ciudadano no encontrado', 404);
    }
    return ciudadano;
  },

  async obtenerPorCodigo(codigo) {
    const ciudadano = await Ciudadano.findOne({ where: { codigo } });
    if (!ciudadano) {
      throw new ApiError('Ciudadano no encontrado', 404);
    }
    return ciudadano;
  },

  async actualizar(id, datos, archivo) {
    const ciudadano = await this.obtenerPorId(id); 

   
    if (datos.codigo || datos.email) {
      const whereClause = {
        [Op.or]: [],
        id: { [Op.not]: id } 
      };
      if (datos.codigo) whereClause[Op.or].push({ codigo: datos.codigo });
      if (datos.email) whereClause[Op.or].push({ email: datos.email });

      const duplicado = await Ciudadano.findOne({ where: whereClause });
      if (duplicado) {
        throw new ApiError('El nuevo código o email ya está en uso por otro ciudadano.', 409);
      }
    }
    

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