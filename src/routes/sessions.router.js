import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../data/models/user.model.js";
import { hashPassword } from "../utils.js";
import UserDTO from "../dtos/user.dto.js";

// 🆕 Imports del manejo de errores
import CustomError from "../services/errors/customError.js";
import { EErrors } from "../services/errors/error-enum.js";
import { generateUserErrorInfo } from "../services/errors/messages/user-error.message.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecreto";

// Registro de usuario
router.post("/register", async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // 1️⃣ Validación de campos vacíos
    if (!first_name || !last_name || !email || !password) {
      throw CustomError.createError({
        name: "UserRegistrationError",
        message: "Campos inválidos al registrar usuario",
        code: EErrors.INVALID_TYPES_ERROR,
        cause: generateUserErrorInfo(req.body),
      });
    }

    // 2️⃣ Validación si el usuario existe
    const exists = await User.findOne({ email });
    if (exists) {
      throw CustomError.createError({
        name: "UserAlreadyExistsError",
        message: "El email ya está registrado",
        code: EErrors.DATABASE_ERROR,
        cause: `Email ingresado: ${email}`,
      });
    }

    // 3️⃣ Crear el usuario
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    res.json({ status: "success", user: newUser });
  } catch (err) {
    next(err); // ⬅ importante para que caiga en el middleware de errores
  }
});

// Login de usuario (igual que antes)
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ message: info?.message || "Error de login" });

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({ status: "success", message: "Login exitoso" });
  })(req, res, next);
});

// Current + Logout iguales
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    const dto = new UserDTO(req.user);
    res.json({ status: "success", user: dto });
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

export default router;
