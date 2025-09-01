// src/services/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Rol, Usuario } from '../models/index.js';

export const authService = {
  async login(email, password) {
    const user = await Usuario.findOne({ where: { email }, include: Rol });
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValido) {
      throw new Error('Credenciales inválidas');
    }

    const payload = {
      id: user.id,
      rol: user.Rol?.nombre || 'POLICIA',
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TTL || '1d'
    });

    return { token };
  },

  async seedAdmin() {
    const [adminRol] = await Rol.findOrCreate({ where: { nombre: 'admin' } });
    await Rol.findOrCreate({ where: { nombre: 'policia' } });

    const email = 'admin@gmail.com';
    const exists = await Usuario.findOne({ where: { email } });

    if (!exists) {
      const passwordHash = await bcrypt.hash('usuario123', 10);
      await Usuario.create({ nombre: 'Admin', email, passwordHash, rolId: adminRol.id });
    }
    return { ok: true };
  }
};