# 🏠 Hostlee - Plataforma de Alquiler de Departamentos y Hoteles

**Hostlee** es una aplicación web completa tipo _Airbnb_, desarrollada con **Node.js**, **Express**, **MongoDB** y **Handlebars**.  
Permite a los usuarios registrarse, gestionar su perfil, subir fotos, reservar hospedajes y a los administradores controlar el contenido del sitio desde un panel seguro.

---

## 🚀 Tecnologías Principales

- **Node.js + Express.js** – Servidor backend y manejo de rutas.
- **MongoDB + Mongoose** – Base de datos NoSQL para persistencia.
- **Express-Handlebars** – Motor de plantillas para las vistas dinámicas.
- **JWT (JSON Web Tokens)** – Autenticación de usuarios y administradores.
- **Multer** – Subida de imágenes (foto de perfil y recursos de hospedaje).
- **Bcrypt.js** – Encriptación de contraseñas.
- **Bootstrap / CSS / JS** – Interfaz moderna y adaptable.

---

## ⚙️ Principales Funcionalidades

### 👤 Usuarios

- Registro y login con validación segura (JWT).
- Actualización de perfil: nombre, apellido, email, edad, contraseña y foto.
- Visualización inmediata de la nueva foto en la **navbar**.
- Persistencia completa en base de datos MongoDB.
- Cierre de sesión automático al expirar el token.

### 🏘️ Propiedades (Hostings)

- Listado completo de departamentos, hoteles y alojamientos.
- Filtros y categorías dinámicas.
- Detalle individual de cada hospedaje.
- Reserva simulada y vista de disponibilidad.

### 🧑‍💼 Panel de Administración

- Acceso mediante credenciales exclusivas (`/login/admin`).
- Control total de usuarios, hospedajes y reservas.
- Visualización de estadísticas y métricas básicas.
- Control de sesión en la navbar (logo e info del administrador visibles).
- Ruta `/admin` protegida: solo accesible con autenticación JWT.

### 🖼️ Gestión de Imágenes

- Subida de fotos de perfil (usuarios).
- Subida de imágenes de alojamientos (administrador).
- Almacenamiento local en `/public/uploads`.
- Visualización automática tras actualizar.

---

## 🧩 Estructura del Proyecto

```
/
├── logs/                         # Registros de la aplicación
│   └── errors.log
|
├── src/                          # CÓDIGO FUENTE DE LA APLICACIÓN
│   ├── app.js                    # Punto de entrada principal de la aplicación
│   ├── config/                   # Configuración global y módulos
│   │   ├── config.js             # Variables de entorno y configuración
│   │   └── passport.js           # Estrategias de autenticación (JWT, local, etc.)
│   │
│   ├── controllers/              # Lógica para manejar las peticiones (La 'C' en MVC)
│   │   ├── bookings.controller.js
│   │   └── users.controller.js
│   │
│   ├── data/                     # Lógica de persistencia de bajo nivel
│   │   ├── models/               # Definiciones de esquemas/modelos (e.g., Mongoose/Sequelize)
│   │   │   ├── Cart.js
│   │   │   ├── Product.js
│   │   │   └── ... (review, ticket, user)
│   │   ├── mongo.singleton.js    # Conexión centralizada a la base de datos
│   │   └── productos.json        # Datos de prueba/semilla (seed)
│   │
│   ├── docs/                     # Documentación de la API (Swagger/OpenAPI)
│   │   ├── swagger.js
│   │   └── users.yaml
│   │
│   ├── dtos/                     # Data Transfer Objects (Transformación de datos)
│   │   └── user.dto.js           # Estandarización de la estructura de datos
│   │
│   ├── logger/                   # Configuración del sistema de logging
│   │   └── logger.js
│   │
│   ├── managers/                 # (Patrón obsoleto/alternativo) Lógica de persistencia o negocio
│   │   ├── CartManager.js
│   │   ├── ProductManager.js
│   │   └── TicketManager.js
│   │
│   ├── middleware/               # Funciones que se ejecutan antes de los controladores
│   │   ├── isAdmin.js
│   │   ├── isAuthenticated.js
│   │   ├── logger.middleware.js
│   │   └── multer.js             # Middleware para manejo de archivos
│   │
│   ├── mocks/                    # Archivos para generar datos de prueba (mocking)
│   │   └── ... (cart, product, reviews, user)
│   │
│   ├── public/                   # Archivos estáticos servidos directamente por el servidor
│   │   ├── css/                  # Hojas de estilo
│   │   │   └── styles.css
│   │   ├── img/                  # Imágenes de la aplicación (logo, banners, fondos)
│   │   │   └── ... (imágenes de la UI)
│   │   ├── js/                   # Scripts de frontend (lógica del lado del cliente)
│   │   │   └── ... (cart.js, navbar.js)
│   │   └── uploads/              # Archivos subidos por los usuarios (Avatares, imágenes de productos)
│   │
│   ├── repositories/             # Abstracción de la capa de datos (Patrón Repository)
│   │   ├── cart.repository.js
│   │   ├── product.repository.js
│   │   └── ticket.repository.js
│   │
│   ├── routes/                   # Definición de las rutas de la API y Vistas
│   │   ├── adminPanel.js         # Rutas específicas para el panel de administración
│   │   ├── bookings.router.js
│   │   ├── carts.router.js
│   │   ├── products.router.js
│   │   └── ... (profile, sessions, users, views)
│   │
│   ├── services/                 # Lógica de Negocio (donde reside la mayor parte de la lógica)
│   │   ├── errors/               # Manejo centralizado de errores personalizados
│   │   │   ├── messages/
│   │   │   ├── middlewares/
│   │   │   └── customError.js
│   │   ├── bookings.service.js
│   │   ├── carts.services.js
│   │   └── users.service.js
│   │
│   ├── views/                    # Plantillas de la interfaz de usuario (Handlebars, Pug, etc.)
│   │   ├── layouts/
│   │   ├── partials/             # Componentes reutilizables (navbar, footer)
│   │   └── ... (home, login, profile, cart, etc. handlebars)
│   │
│   └── utils.js                  # Funciones auxiliares/helpers
|
├── test/                         # Pruebas automatizadas (Unitarias, Integración, End-to-End)
│   ├── cart.test.js
│   ├── product.test.js
│   └── ... (reviews, users)
|
├── .env                          # Variables de entorno (EXCLUIDO en .gitignore)
├── .gitignore                    # Archivos y carpetas a ignorar por Git
├── docker-compose.yml            # Orquestación de contenedores
├── Dockerfile                    # Instrucciones para construir la imagen del contenedor
├── package.json                  # Metadatos y dependencias de Node.js
└── README.md                     # Documentación principal del proyecto
```

---

## 🧠 Autenticación y Seguridad

- **Usuarios:** inicio de sesión con JWT almacenado en cookies seguras.
- **Administradores:** rutas `/admin` protegidas, acceso solo mediante `login/admin`.
- **Middlewares:** verificación automática de sesión antes de acceder a rutas restringidas.
- **Protección de contraseñas:** todas las claves se encriptan con bcrypt.

---

## 🧾 Rutas Principales

### 🔐 Autenticación

| Método | Ruta        | Descripción                      |
| ------ | ----------- | -------------------------------- |
| `GET`  | `/login`    | Formulario de login de usuario   |
| `POST` | `/login`    | Autenticación y creación de JWT  |
| `GET`  | `/register` | Registro de nuevo usuario        |
| `POST` | `/register` | Guarda nuevo usuario en BD       |
| `GET`  | `/logout`   | Cierre de sesión (elimina token) |

### 👤 Usuario

| Método | Ruta              | Descripción                |
| ------ | ----------------- | -------------------------- |
| `GET`  | `/profile`        | Muestra perfil del usuario |
| `POST` | `/profile/update` | Actualiza datos personales |
| `POST` | `/profile/upload` | Sube nueva foto de perfil  |

### 🧑‍💼 Admin

| Método | Ruta            | Descripción                        |
| ------ | --------------- | ---------------------------------- |
| `GET`  | `/login/admin`  | Login de administrador             |
| `POST` | `/login/admin`  | Verifica credenciales admin        |
| `GET`  | `/admin`        | Dashboard (solo admin autenticado) |
| `GET`  | `/admin/logout` | Cierre de sesión admin             |

---

## 🧰 Configuración del Proyecto

1. Clonar el repositorio

   ```bash
   git clone https://github.com/ImanolPeralta/Hostlee.git
   cd Hostlee
   ```

2. Instalar dependencias

   ```bash
   npm install
   ```

3. Crear archivo `.env` con tus variables:

   ```
   MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/hostlee
   JWT_SECRET=tu_clave_secreta
   PORT=8080
   ```

4. Iniciar el servidor
   ```bash
   npm start
   ```

---

## 🐋 Docker & Docker Compose

Este proyecto incluye un entorno completamente contenedorizado con
Node.js y MongoDB, utilizando Docker Compose.\
No necesitas instalar Node, Mongo ni dependencias: todo corre dentro de
los contenedores.

------------------------------------------------------------------------

### 🚀 Ejecutar con Docker Compose (recomendado)

### 1️⃣ Levantar el entorno

``` bash
docker compose up --build
```

Esto realizará:

-   Construcción de la imagen del backend\
-   Creación del contenedor de MongoDB\
-   Conexión entre servicios dentro de la red interna\
-   Exposición del backend en:\
    👉 http://localhost:8080

### 2️⃣ Ejecutar en segundo plano

``` bash
docker compose up -d
```

### 3️⃣ Detener los contenedores

``` bash
docker compose down
```

### 4️⃣ Detener y eliminar volúmenes (incluye datos de MongoDB)

``` bash
docker compose down -v
```

------------------------------------------------------------------------

## 🔧 Variables de entorno en Docker

Docker Compose establece automáticamente las variables necesarias.

Tu backend se conecta al contenedor de Mongo en:

    MONGO_URI=mongodb://hostlee-mongo:27017/hostlee

**Importante:** Dentro de Docker no se usa `localhost`.\
El servicio se llama **hostlee-mongo** gracias a la red interna creada
por Compose.

------------------------------------------------------------------------

## 🐋 Imagen Docker publicada en Docker Hub

Si solo deseas ejecutar la imagen sin Docker Compose, puedes hacerlo
manualmente:

🔗 Imagen en Docker Hub:\
(https://hub.docker.com/r/imanolpdev/hostlee-backend)

### Descargar la imagen

``` bash
docker pull imanolpdev/hostlee-backend:latest
```

### Ejecutar el contenedor manualmente

⚠️ *Solo recomendable si no usarás Mongo en Docker (tendrías que tener
Mongo instalado localmente).*

``` bash
docker run -p 8080:8080 --env-file .env imanolpdev/hostlee-backend:latest
```

------------------------------------------------------------------------

## 🛠️ Construir y publicar manualmente la imagen

### Construir la imagen

``` bash
docker build -t hostlee-backend .
```

### Publicarla en Docker Hub

``` bash
docker tag hostlee-backend imanolpdev/hostlee-backend:latest
docker push imanolpdev/hostlee-backend:latest
```

---

## 👨‍💻 Autor

**Imanol Augusto Peralta**  
📧 [imanolaugusto18@gmail.com](mailto:imanolaugusto18@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/imanol-augusto-peralta)
💻 [GitHub](https://github.com/ImanolPeralta)

---

## 📝 Notas Finales

- Proyecto final desarrollado para los cursos **Programación Backend I / II / III**.
- Implementa manejo de sesiones, roles y persistencia real en MongoDB.
- Incluye sistema de subida y visualización de imágenes.
- Estructura escalable y modular, pensada para futuras ampliaciones (chat, reservas reales, etc.).