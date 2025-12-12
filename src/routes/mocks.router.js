import { Router } from "express";
import { generateProductMock } from "../mocks/product.mock.js";
import { generateUserMock } from "../mocks/user.mock.js";
import { generateReviewMock } from "../mocks/reviews.mock.js";
import { generateCartMock } from "../mocks/cart.mock.js";

const router = Router();

// Ruta para generar productos mock
router.get("/products", (req, res) => {
    const num = parseInt(req.query.num) || 10;
    const data = Array.from({ length: num }, generateProductMock);

    res.send({ stauts: "success", payload: data, quantity: data.length });
});

// Ruta para generar usuarios mock
router.get("/users", (req, res) => {
    const num = parseInt(req.query.num) || 10;
    const data = Array.from({ length: num }, generateUserMock);

    res.send({ stauts: "success", payload: data, quantity: data.length });
});

// Ruta para generar reviews mock
router.get("/reviews", (req, res) => {
    const num = parseInt(req.query.num) || 10;
    const data = Array.from({ length: num }, generateReviewMock);

    res.send({ stauts: "success", payload: data, quantity: data.length });
});

// Ruta para generar carts mock
router.get("/carts", (req, res) => {
    const num = parseInt(req.query.num) || 10;
    const data = Array.from({ length: num }, generateCartMock);

    res.send({ stauts: "success", payload: data, quantity: data.length });
});

export default router;