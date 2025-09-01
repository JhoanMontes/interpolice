import { body, validationResult } from 'express-validator';


export const crearCiudadanoValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),

  body('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.')
    .normalizeEmail(),
    
  body('codigo')
    .notEmpty().withMessage('El código es obligatorio.')
    .isAlphanumeric().withMessage('El código solo puede contener letras y números.'),
  
 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    
      return res.status(400).json({ errors: errors.array() });
    }
    
    next();
  }
];

export const actualizarCiudadanoValidator = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),

  body('email')
    .optional()
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.')
    .normalizeEmail(),

  // ... otras reglas opcionales

  // Middleware para manejar los errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];