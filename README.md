
API "INTERPOLICE"
===================================

URL Base: Todas las rutas están prefijadas con /api.
          Ejemplo: http://localhost:3000/api/auth/login

Autenticación: Las rutas protegidas requieren un Bearer Token en la
             cabecera 'Authorization'.
             Ejemplo: Authorization: Bearer <TU_TOKEN_JWT>

-------------------------------------------------------------------------------
## Autenticación
-------------------------------------------------------------------------------

#### Iniciar Sesión (Login)
    POST /api/auth/login

Autentica a un usuario y devuelve un token JWT si las credenciales son correctas.

Body (application/json)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| email | string | Required. Email del usuario. |
| password | string | Required. Contraseña del usuario. |

Crear Usuario Administrador (Seed)
    POST /api/auth/seed-admin

Crea el usuario administrador inicial si no existe. Es una ruta de
configuración para el primer uso. No requiere cuerpo ni autenticación.

#### Crear Usuario Administrador (Seed)
    POST /api/auth/seed-admin

Crea el usuario administrador inicial si no existe. Es una ruta de
configuración para el primer uso. No requiere cuerpo ni autenticación.


-------------------------------------------------------------------------------
## Ciudadanos
-------------------------------------------------------------------------------

#### Listar todos los Ciudadanos
    GET /api/ciudadanos

Obtiene una lista de todos los ciudadanos registrados.

Cabeceras (Headers)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| Authorization | string | Required. Bearer token del usuario autenticado. |

Obtener Ciudadano por Código (Público)
    GET /api/ciudadanos/codigo/:codigo

Obtiene los datos de un ciudadano a través de su código único. Este
endpoint es público para ser usado con el QR.

Parámetros de Ruta (Path Parameters)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| codigo | string | Required. El código único del ciudadano a buscar. |

#### Obtener Ciudadano por ID
    GET /api/ciudadanos/:id

Obtiene los datos de un ciudadano a través de su ID de base de datos.

Cabeceras (Headers)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| Authorization | string | Required. Bearer token del usuario autenticado. |

Parámetros de Ruta (Path Parameters)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| id | integer | Required. El ID del ciudadano a buscar. |

#### Crear un nuevo Ciudadano
    POST /api/ciudadanos

Registra un nuevo ciudadano. La petición debe ser de tipo 'multipart/form-data'
para poder incluir la foto.

Cabeceras (Headers)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| Authorization | string | Required. Bearer token del usuario autenticado. |

Cuerpo (Body - multipart/form-data)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| nombre | string | Required. Nombre completo. |
| email | string | Required. Email único. |
| codigo | string | Required. Código único. |
| foto | file | Optional. Archivo de imagen para el perfil. |

#### Actualizar un Ciudadano
    PUT /api/ciudadanos/:id

Actualiza los datos de un ciudadano existente. La petición debe ser
'multipart/form-data' si se va a actualizar la foto.

Permisos: Requiere rol de 'admin' o 'policia'.

Cabeceras (Headers)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| Authorization | string | Required. Bearer token del usuario autenticado. |

Parámetros de Ruta (Path Parameters)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| id | integer | Required. El ID del ciudadano a actualizar. |

Cuerpo (Body - multipart/form-data)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| nombre | string | Optional. Nuevo nombre. |
| email | string | Optional. Nuevo email. |
| codigo | string | Optional. Nuevo código. |
| foto | file | Optional. Nueva foto. |

#### Eliminar un Ciudadano
    DELETE /api/ciudadanos/:id

Elimina un ciudadano del sistema.

Permisos: Requiere rol de 'admin'.

Cabeceras (Headers)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| Authorization | string | Required. Bearer token del usuario autenticado. |

Parámetros de Ruta (Path Parameters)
| Parameter | Type | Description |
| :--- | :--- | :--- |
| id | integer | Required. El ID del ciudadano a eliminar. |
