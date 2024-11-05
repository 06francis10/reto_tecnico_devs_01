# Sistema de Gestión de Tareas de Equipo

## Requisitos
- Node.js y npm instalados.
- MongoDB como base de datos.
- Variables de entorno configuradas (archivo `.env`).

## Instalación
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env`:
   ```env
   PORT=3000
   SECRET_KEY=<tu_clave_secreta>
   MONGO_URI=<tu_URI_de_MongoDB>
   ```
4. Ejecuta el servidor:
   ```bash
   npm run dev
   ```

## Endpoints de la API

### Autenticación

#### 1. Registro de Usuario
- **Ruta**: `/api/register`
- **Método**: `POST`
- **Descripción**: Registra un nuevo usuario.
- **Cuerpo de la solicitud**:
  ```json
  {
    "name": "Juan Perez",
    "email": "juan.perez@example.com",
    "password": "contraseña123"
  }
  ```
- **Validaciones**:
  - `name` es obligatorio y debe tener máximo 50 caracteres.
  - `email` es obligatorio, debe ser válido y tener entre 5 y 50 caracteres.
  - `password` es obligatorio, debe tener al menos 6 caracteres y un máximo de 100.

#### 2. Inicio de Sesión
- **Ruta**: `/api/login`
- **Método**: `POST`
- **Descripción**: Permite a un usuario autenticarse y recibir un token JWT.
- **Cuerpo de la solicitud**:
  ```json
  {
    "email": "juan.perez@example.com",
    "password": "contraseña123"
  }
  ```
- **Validaciones**:
  - `email` es obligatorio y debe ser válido.
  - `password` es obligatorio.

#### 3. Cierre de Sesión
- **Ruta**: `/api/logout`
- **Método**: `POST`
- **Descripción**: Cierra la sesión del usuario actual.

### Gestión de Tareas

#### 4. Obtener Lista de Tareas
- **Ruta**: `/api/tasks`
- **Método**: `GET`
- **Descripción**: Obtiene todas las tareas con la posibilidad de filtrar por `status` o `assignedTo`.
- **Parámetros de query opcionales**:
  - `status`: Filtrar tareas por estado (e.g., `Pendiente`, `En Progreso`, `Completa`).
  - `assignedTo`: Filtrar por el ID del usuario al que está asignada la tarea.

#### 5. Crear Nueva Tarea (Solo Admin)
- **Ruta**: `/api/tasks`
- **Método**: `POST`
- **Descripción**: Permite a un usuario Admin crear y asignar tareas.
- **Cuerpo de la solicitud**:
  ```json
  {
    "title": "Reunión de equipo",
    "description": "Reunión para revisar el estado de los proyectos",
    "status": "Pendiente",
    "assignedTo": "<ID_DE_USUARIO>",
    "dueDate": "2024-12-01"
  }
  ```
- **Validaciones**:
  - `title` debe tener entre 3 y 50 caracteres.
  - `description` debe tener entre 5 y 100 caracteres.
  - `status` debe ser uno de: `Pendiente`, `En Progreso`, `Completa`.
  - `dueDate` debe ser una fecha válida.

#### 6. Actualizar Estado de una Tarea
- **Ruta**: `/api/tasks/:id`
- **Método**: `PUT`
- **Descripción**: Permite a un usuario actualizar el estado de una tarea asignada a él.
- **Cuerpo de la solicitud**:
  ```json
  {
    "status": "En Progreso"
  }
  ```
- **Validaciones**:
  - `id` debe ser un identificador de 24 caracteres válido.
  - `status` debe ser uno de: `Pendiente`, `En Progreso`, `Completa`.

#### 7. Eliminar una Tarea (Solo Admin)
- **Ruta**: `/api/tasks/:id`
- **Método**: `DELETE`
- **Descripción**: Permite a un usuario Admin eliminar una tarea.
- **Validaciones**:
  - `id` debe ser un identificador de 24 caracteres válido.

## Seguridad
- Se utiliza autenticación mediante JWT. El token debe incluirse en el header de las solicitudes protegidas:
  ```
  Authorization: Bearer <TOKEN>
  ```

## Manejo de Errores
La API devuelve respuestas JSON con códigos de estado HTTP adecuados (400, 401, 403, 404) y un mensaje que describe el error.
