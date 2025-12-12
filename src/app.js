import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";

import { config } from "./config/config.js";
const PORT = config.PORT;

import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { createServer } from "http";
import { Server } from "socket.io";
import ProductManager from "./managers/ProductManager.js";
import MongoSingleton from "./data/mongo.singleton.js";
import { fileURLToPath } from "url";
import session from "express-session";
import cartCount from "./middleware/cartCount.js";
import adminAuthRouter from "./routes/adminAuth.js";
import profileRouter from "./routes/profile.router.js";
import { isAdmin } from "./middleware/isAdmin.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "./data/models/user.model.js";
import "./config/passport.js";
import sessionsRouter from "./routes/sessions.router.js";
import reviewsRouter from "./routes/reviews.router.js";
import { errorHandler } from "./services/errors/middlewares/error-middleware.js";
import { addLogger } from "./middleware/logger.middleware.js";
import mocksRouter from "./routes/mocks.router.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __filename = fileURLToPath(import.meta.url);

// Conexión a MongoDB
if (config.NODE_ENV !== "test") {
  MongoSingleton.getInstance();
}

// Instancia del manager (aunque uses Mongo, podrías tener funciones auxiliares ahí)
const productManager = new ProductManager();

// Configurar Handlebars como motor de vistas
app.engine(
  "handlebars",
  engine({
    helpers: {
      multiply: (a, b) => a * b,
      calculateSubtotal: (products) =>
        products
          .reduce((acc, p) => acc + p.product.price * p.quantity, 0)
          .toFixed(2),
      calculateTax: (products) =>
        (
          products.reduce((acc, p) => acc + p.product.price * p.quantity, 0) *
          0.21
        ).toFixed(2),
      shippingCost: (products) => {
        const subtotal = products.reduce(
          (acc, p) => acc + p.product.price * p.quantity,
          0
        );
        return subtotal > 100 ? 0 : 10; // Ejemplo: envío gratis > $100
      },
      calculateTotal: (products) => {
        const subtotal = products.reduce(
          (acc, p) => acc + p.product.price * p.quantity,
          0
        );
        const tax = subtotal * 0.21;
        const shipping = subtotal > 100 ? 0 : 10;
        return (subtotal + tax + shipping).toFixed(2);
      },
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));
app.use(
  session({
    secret: "tu_clave_secreta", // cambia esto por una clave segura
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 día de duración (ajustalo según necesites)
    },
  })
);
// --- Middleware global para pasar estado del admin a todas las vistas ---
app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

// --- Middleware: poblar res.locals.user desde JWT en cookie (para templates) ---
const JWT_SECRET = config.JWT_SECRET
app.use(async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.token;
    if (token) {
      const payload = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(payload.id).lean();
      if (user) {
        res.locals.user = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar || null,
          initials:
            (user.first_name && user.first_name[0]
              ? user.first_name[0].toUpperCase()
              : "") +
            (user.last_name && user.last_name[0]
              ? user.last_name[0].toUpperCase()
              : ""),
        };
        req.user = user;
      }
    }
  } catch (err) {
    // token inválido o usuario no encontrado -> continuar sin usuario
  }
  next();
});
// --- fin middleware ---

// Logger
app.use(addLogger);

app.use(cartCount); // Middleware para contar productos en el carrito

// Rutas
app.use("/", viewsRouter); // Página de inicio
app.use("/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/admin", adminAuthRouter); // Rutas de autenticación del admin

// Mocking rutes
app.use("/api/mocks", mocksRouter);

// Perfil de usuario
app.use("/", profileRouter);

// Ruta de autenticación de usuario con JWT
app.use("/api/sessions", sessionsRouter);

// Ruta de comentarios y reseñas
app.use("/api/reviews", reviewsRouter);

// Ruta de errores ⛔
app.use(errorHandler);

// WebSockets
io.on("connection", async (socket) => {
  console.log("🟢 Cliente conectado");

  // Emitir lista de productos al conectar
  const result = await productManager.getProducts();
  socket.emit("productosActualizados", result.payload);

  // Nuevo producto
  // Nuevo producto
  socket.on("nuevoProducto", async (producto) => {
    try {
      if (producto.imageUrl) {
        producto.thumbnails = [producto.imageUrl];
        delete producto.imageUrl;
      } else {
        producto.thumbnails = [];
      }

      // Verifico duplicado por code
      const exists = await productManager.getProductByCode(producto.code);
      if (exists) {
        return socket.emit("error", {
          message: `El producto con code "${producto.code}" ya existe`,
        });
      }

      await productManager.addProduct(producto);
      const updatedResult = await productManager.getProducts();
      io.emit("productosActualizados", updatedResult.payload);
    } catch (error) {
      console.error("Error agregando producto:", error);
      socket.emit("error", {
        message: "Error en el servidor al agregar producto",
      });
    }
  });

  // Editar producto
  socket.on("editarProducto", async (updatedProduct) => {
    try {
      await productManager.updateProduct(updatedProduct.id, updatedProduct);

      const updatedResult = await productManager.getProducts();

      // Emito SIEMPRE un array
      io.emit("productosActualizados", updatedResult.payload);
    } catch (error) {
      console.error("Error editando producto:", error);
      socket.emit("error", { message: "Error en el servidor" });
    }
  });

  // Eliminar producto
  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProduct(id);
    const updatedResult = await productManager.getProducts();
    io.emit("productosActualizados", updatedResult.payload);
  });
});

// Iniciar servidor
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
// });

// Iniciar servidor solo si NO estamos en testing
if (config.NODE_ENV !== "test") {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
}

// Exportar app (para Supertest)
export default app;
