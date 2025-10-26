import { Router } from "express";

const router = Router();

// ✅ Página de login del admin
router.get("/login", (req, res) => {
  res.render("adminLogin", {
    title: "Login Administrador",
  });
});

// ✅ Procesar el login del admin
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@hostlee.com" && password === "1234") {
    req.session.isAdmin = true;
    req.session.adminEmail = email; // guardamos info básica
    return res.redirect("/admin");
  }

  res.render("adminLogin", {
    title: "Login Administrador",
    error: "Usuario o contraseña incorrectos",
  });
});

// ✅ Ruta protegida: panel del admin
router.get("/", (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect("/admin/login");
  }

  res.render("adminDashboard", {
    title: "Panel de Administración",
    adminEmail: req.session.adminEmail || "Administrador",
  });
});

// ✅ Logout del admin
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión del admin:", err);
      return res.redirect("/admin");
    }
    res.redirect("/");
  });
});

export default router;
