import { Router } from "express";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";
import User from "../data/models/user.model.js";
import fs from "fs";
import bcrypt from "bcrypt";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

// Configuración de Multer (para subir avatares)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(
      process.cwd(),
      "src",
      "public",
      "uploads",
      "avatars"
    );
    fs.mkdirSync(uploadDir, { recursive: true }); // crea carpeta si no existe
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${req.user.id}-${Date.now()}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// Middleware de autenticación
async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.redirect("/login");

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).lean(); // ⚠️ con .lean() para obtener objeto plano

    if (!user) return res.redirect("/login");

    // Normalizar el formato (usar id en vez de _id)
    req.user = {
      id: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar || null,
    };

    next();
  } catch (err) {
    console.error("Error en requireAuth:", err);
    return res.redirect("/login");
  }
}

// GET → Mostrar perfil
router.get("/", requireAuth, async (req, res) => {
  res.render("profile", { title: "Mi Perfil", user: req.user });
});

// PUT → Actualizar perfil vía fetch (sin recargar la página)
router.put(
  "/api/users/profile",
  requireAuth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const { first_name, last_name, email, age, password } = req.body;
      const update = { first_name, last_name, email, age };

      if (password && password.trim() !== "") {
        const hashed = await bcrypt.hash(password, 10);
        update.password = hashed;
      }

      if (req.file) {
        update.avatar = "/uploads/avatars/" + req.file.filename;
      }

      const updatedUser = await User.findByIdAndUpdate(req.user.id, update, {
        new: true,
      }).lean();

      // actualizar token y locals
      const token = jwt.sign(
        {
          id: updatedUser._id,
          email: updatedUser.email,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          avatar: updatedUser.avatar || null,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.locals.user = updatedUser;

      res.status(200).json({
        success: true,
        message: "Perfil actualizado correctamente",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      res
        .status(500)
        .json({ success: false, message: "Error al actualizar perfil" });
    }
  }
);

export default router;
