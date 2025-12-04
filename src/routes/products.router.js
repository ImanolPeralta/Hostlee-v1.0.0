import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

// Manejo de errores
import CustomError from "../services/errors/customError.js";
import { EErrors } from "../services/errors/error-enum.js";
import { generateProductErrorInfo } from "../services/errors/messages/product-error.message.js";

const router = Router();
const manager = new ProductManager();

// GET /api/products/?limit=5
router.get("/", async (req, res) => {
  req.logger.info("GET /api/products - listado de productos solicitado");

  try {
    const { limit, page, sort, query } = req.query;
    const result = await manager.getProducts({ limit, page, sort, query });

    req.logger.debug("Productos obtenidos correctamente");
    res.send(result);
  } catch (error) {
    req.logger.error("Error al obtener productos: " + error.message);
    res.status(500).json({ error: "Error al obtener productos." });
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  req.logger.info(`GET /api/products/${req.params.pid} - detalle solicitado`);

  try {
    const id = req.params.pid;
    const product = await manager.getProductById(id);

    if (!product) {
      req.logger.warning(`Producto no encontrado: ${id}`);
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.json(product);
  } catch (error) {
    req.logger.error("Error al obtener producto: " + error.message);
    res.status(500).json({ error: "Error al obtener el producto." });
  }
});

// GET pagination
router.get("/", async (req, res) => {
  req.logger.info("GET /api/products paginado solicitado");

  try {
    const { page = 1, limit = 10, sort } = req.query;

    req.logger.debug(
      `Query params => page:${page}, limit:${limit}, sort:${sort}`
    );

    const sortOption =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort: sortOption,
    };

    const result = await ProductModel.paginate({}, options);
    res.json(result);
  } catch (err) {
    req.logger.error("Error fetching pagination: " + err.message);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// POST
router.post("/", async (req, res, next) => {
  req.logger.info("POST /api/products - creando producto");

  try {
    const { title, description, price, code, stock } = req.body;

    // Validación con registro
    if (!title || !description || !price || !code || !stock) {
      req.logger.warning("Intento de crear producto con datos inválidos");

      return next(
        CustomError.createError({
          name: "ProductCreationError",
          message: "Datos inválidos al crear producto",
          code: EErrors.PRODUCT_VALIDATION_ERROR,
          cause: generateProductErrorInfo(req.body),
        })
      );
    }

    const newProduct = await manager.addProduct(req.body);

    req.logger.info("Producto creado satisfactoriamente");
    res.status(201).json(newProduct);
  } catch (error) {
    req.logger.error("Error en POST products: " + error.message);
    next(error);
  }
});

// PUT
router.put("/:pid", async (req, res) => {
  req.logger.info(
    `PUT /api/products/${req.params.pid} - actualización solicitada`
  );

  try {
    const id = req.params.pid;
    const updated = await manager.updateProduct(id, req.body);

    if (!updated) {
      req.logger.warning(`Producto no encontrado para actualizar: ${id}`);
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    req.logger.info(`Producto actualizado: ${id}`);
    res.json(updated);
  } catch (error) {
    req.logger.error("Error al actualizar producto: " + error.message);
    res.status(500).json({ error: "Error al actualizar el producto." });
  }
});

// DELETE
router.delete("/:pid", async (req, res) => {
  req.logger.info(
    `DELETE /api/products/${req.params.pid} - eliminación solicitada`
  );

  try {
    const id = req.params.pid;
    const deleted = await manager.deleteProduct(id);

    if (!deleted) {
      req.logger.warning(`Producto no encontrado para eliminar: ${id}`);
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    req.logger.info(`Producto eliminado con éxito: ${id}`);
    res.json({ message: "Producto eliminado con éxito." });
  } catch (error) {
    req.logger.error("Error al eliminar producto: " + error.message);
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
});

export default router;
