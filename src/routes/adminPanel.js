import express from "express";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/dashboard", isAdmin, (req, res) => {
  res.render("adminDashboard", { title: "Panel de administrador" });
});

export default router;
