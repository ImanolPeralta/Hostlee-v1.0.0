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
 * Obtiene todas las reseñas + promedio de puntuación
 */
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId })
      .populate("user", "first_name last_name avatar")
      .sort({ createdAt: -1 });

    // Calcular promedio
    const ratings = reviews.map((r) => r.rating).filter(Boolean);
    const avgRating = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : null;

    res.json({ reviews, avgRating });
  } catch (error) {
    console.error("Error obteniendo reseñas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/**
 * ⭐ POST /api/reviews/:productId/rating
 * Permite a un usuario logueado puntuar un alojamiento
 */
router.post("/:productId/rating", isAuthenticated, async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ error: "La puntuación debe ser entre 1 y 5" });
    }

    // Verificar si el usuario ya calificó este producto
    const existing = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existing) {
      existing.rating = rating;
      await existing.save();
      return res.json({ message: "Puntuación actualizada", review: existing });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
    });

    await review.populate("user", "first_name last_name avatar");
    res.status(201).json({ message: "Puntuación registrada", review });
  } catch (error) {
    console.error("Error guardando puntuación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
