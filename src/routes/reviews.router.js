import { Router } from "express";
import Review from "../data/models/review.model.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

/**
 * 📥 POST /api/reviews
 * Crea una nueva reseña asociada a un producto y usuario logueado
 */
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { productId, comment } = req.body;

    if (!comment || !comment.trim()) {
      return res
        .status(400)
        .json({ error: "El comentario no puede estar vacío" });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      comment: comment.trim(),
    });

    await review.populate("user", "first_name last_name avatar");

    res.status(201).json({
      message: "Reseña agregada correctamente",
      review,
    });
  } catch (error) {
    console.error("Error creando reseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/**
 * 📤 GET /api/reviews/:productId
 * Obtiene todas las reseñas de un producto
 */
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("user", "first_name last_name avatar")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error("Error obteniendo reseñas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
