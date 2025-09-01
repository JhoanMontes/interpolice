📖 Referencia de la API “INTERPOLICE”

🌐 URL Base

Todas las rutas están prefijadas con /api.
Ejemplo:

    http://localhost:3000/api/auth/login

🔑 Autenticación

Las rutas protegidas requieren un Bearer Token en la cabecera
Authorization.
Ejemplo:

    Authorization: Bearer <TU_TOKEN_JWT>

------------------------------------------------------------------------

🔐 Autenticación

Iniciar Sesión (Login)

    POST /api/auth/login

Autentica a un usuario y devuelve un token JWT si las credenciales son
correctas.

Body (application/json): | Parámetro | Tipo | Requerido | Descripción |
|———–|——–|———–|————————| | email | string | ✔️ | Email del usuario | |
password | string | ✔️ | Contraseña del usuario |

------------------------------------------------------------------------

Crear Usuario Administrador (Seed)

    POST /api/auth/seed-admin

Crea el usuario administrador inicial si no existe.
Es una ruta de configuración para el primer uso.
⚠️ No requiere cuerpo ni autenticación.

------------------------------------------------------------------------

👤 Ciudadanos

Listar todos los Ciudadanos

    GET /api/ciudadanos

Obtiene una lista de todos los ciudadanos registrados.

Headers: | Parámetro | Tipo | Requerido | Descripción |
|—————|——–|———–|————————————-| | Authorization | string | ✔️ | Bearer
token del usuario autenticado |

------------------------------------------------------------------------

Obtener Ciudadano por Código (Público)

    GET /api/ciudadanos/codigo/:codigo

Obtiene los datos de un ciudadano a través de su código único.
Este endpoint es público (pensado para uso con QR).

Path Params: | Parámetro | Tipo | Requerido | Descripción |
|———–|——–|———–|————————————-| | codigo | string | ✔️ | Código único del
ciudadano a buscar |

------------------------------------------------------------------------

Obtener Ciudadano por ID

    GET /api/ciudadanos/:id

Obtiene los datos de un ciudadano a través de su ID de base de datos.

Headers: | Parámetro | Tipo | Requerido | Descripción |
|—————|——–|———–|————————————-| | Authorization | string | ✔️ | Bearer
token del usuario autenticado |

Path Params: | Parámetro | Tipo | Requerido | Descripción |
|———–|———|———–|——————————| | id | integer | ✔️ | ID del ciudadano a
buscar |

------------------------------------------------------------------------

Crear un nuevo Ciudadano

    POST /api/ciudadanos

Registra un nuevo ciudadano. La petición debe ser de tipo
multipart/form-data para poder incluir la foto.

Headers: | Parámetro | Tipo | Requerido | Descripción |
|—————|——–|———–|————————————-| | Authorization | string | ✔️ | Bearer
token del usuario autenticado |

Body (multipart/form-data): | Parámetro | Tipo | Requerido | Descripción
| |———–|——–|———–|———————————-| | nombre | string | ✔️ | Nombre completo
| | email | string | ✔️ | Email único | | codigo | string | ✔️ | Código
único | | foto | file | Opcional | Archivo de imagen para el perfil |

------------------------------------------------------------------------

Actualizar un Ciudadano

    PUT /api/ciudadanos/:id

Actualiza los datos de un ciudadano existente.
La petición debe ser multipart/form-data si se va a actualizar la foto.

🔒 Permisos: Requiere rol de admin o policia.

Headers: | Parámetro | Tipo | Requerido | Descripción |
|—————|——–|———–|————————————-| | Authorization | string | ✔️ | Bearer
token del usuario autenticado |

Path Params: | Parámetro | Tipo | Requerido | Descripción |
|———–|———|———–|————————————-| | id | integer | ✔️ | ID del ciudadano a
actualizar |

Body (multipart/form-data): | Parámetro | Tipo | Requerido | Descripción
| |———–|——–|———–|———————| | nombre | string | Opcional | Nuevo nombre |
| email | string | Opcional | Nuevo email | | codigo | string | Opcional
| Nuevo código | | foto | file | Opcional | Nueva foto |

------------------------------------------------------------------------

Eliminar un Ciudadano

    DELETE /api/ciudadanos/:id

Elimina un ciudadano del sistema.

🔒 Permisos: Requiere rol de admin.

Headers: | Parámetro | Tipo | Requerido | Descripción |
|—————|——–|———–|————————————-| | Authorization | string | ✔️ | Bearer
token del usuario autenticado |

Path Params: | Parámetro | Tipo | Requerido | Descripción |
|———–|———|———–|——————————-| | id | integer | ✔️ | ID del ciudadano a
eliminar |
