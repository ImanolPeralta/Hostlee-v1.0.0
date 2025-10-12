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
┣ 📂config
┃ ┗ 📜passport.js
┣ 📂data
┃ ┣ 📂models
┃ ┃ ┣ 📜Cart.js
┃ ┃ ┣ 📜Product.js
┃ ┃ ┣ 📜ticket.model.js
┃ ┃ ┗ 📜user.model.js
┃ ┣ 📜carrito.json
┃ ┣ 📜db.js
┃ ┗ 📜productos.json
┣ 📂dtos
┃ ┗ 📜user.dto.js
┣ 📂managers
┃ ┣ 📜CartManager.js
┃ ┣ 📜ProductManager.js
┃ ┗ 📜TicketManager.js
┣ 📂middleware
┃ ┣ 📜cartCount.js
┃ ┣ 📜cartCount.js.bak
┃ ┣ 📜isAdmin.js
┃ ┗ 📜role.middleware.js
┣ 📂public
┃ ┣ 📂css
┃ ┃ ┣ 📜styles.css
┃ ┃ ┗ 📜styles.css.bak
┃ ┣ 📂img
┃ ┃ ┣ 📜24-7.png
┃ ┃ ┣ 📜admin-bg.jpg
┃ ┃ ┣ 📜hero-about.png
┃ ┃ ┣ 📜hero.png
┃ ┃ ┣ 📜login-bg.jpg
┃ ┃ ┣ 📜logo.png
┃ ┃ ┣ 📜mejor-precio.png
┃ ┃ ┣ 📜propiedades-verificadas.png
┃ ┃ ┗ 📜register-bg.jpg
┃ ┣ 📂js
┃ ┃ ┣ 📜cart.js
┃ ┃ ┣ 📜cart.js.bak
┃ ┃ ┗ 📜navbar.js
┃ ┗ 📂uploads
┃   ┗ 📂avatars
┣ 📂repositories
┃ ┣ 📜cart.repository.js
┃ ┣ 📜product.repository.js
┃ ┗ 📜ticket.repository.js
┣ 📂routes
┃ ┣ 📜adminAuth.js
┃ ┣ 📜adminPanel.js
┃ ┣ 📜carts.router.js
┃ ┣ 📜carts.router.js.bak
┃ ┣ 📜products.router.js
┃ ┣ 📜profile.router.js
┃ ┣ 📜sessions.router.js
┃ ┗ 📜views.router.js
┣ 📂services
┃ ┗ 📜carts.services.js
┣ 📂views
┃ ┣ 📂layouts
┃ ┃ ┣ 📜main.handlebars
┃ ┃ ┗ 📜main.handlebars.bak
┃ ┣ 📂partials
┃ ┃ ┣ 📜footer.handlebars
┃ ┃ ┣ 📜navbar.handlebars
┃ ┃ ┗ 📜navbar.handlebars.bak
┃ ┣ 📜about.handlebars
┃ ┣ 📜admin.handlebars
┃ ┣ 📜adminLogin.handlebars
┃ ┣ 📜cart.handlebars
┃ ┣ 📜contact.handlebars
┃ ┣ 📜departamentos.handlebars
┃ ┣ 📜faq.handlebars
┃ ┣ 📜home.handlebars
┃ ┣ 📜login.handlebars
┃ ┣ 📜productDetail.handlebars
┃ ┣ 📜profile.handlebars
┃ ┗ 📜register.handlebars
┣ 📜app.js
┣ 📜app.js.bak
┗ 📜utils.js
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

## 👨‍💻 Autor

**Imanol Augusto Peralta**  
📧 [imanolaugusto18@gmail.com](mailto:imanolaugusto18@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/imanol-augusto-peralta)  
💻 [GitHub](https://github.com/ImanolPeralta)

---

## 📝 Notas Finales

- Proyecto desarrollado para el curso **Programación Backend II - Arquitectura Backend (Coderhouse)**.
- Implementa manejo de sesiones, roles y persistencia real en MongoDB.
- Incluye sistema de subida y visualización de imágenes.
- Estructura escalable y modular, pensada para futuras ampliaciones (chat, reservas reales, etc.).
