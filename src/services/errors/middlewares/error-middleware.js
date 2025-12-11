import { EErrors } from "../error-enum.js";

export const errorHandler = (err, req, res, next) => {
  console.log("❌ Error capturado:");
  console.log("Nombre:", err.name);
  console.log("Código:", err.code);
  console.log("Causa:", err.cause);
  console.log("STACK:", err.stack);

  switch (err.code) {
    case EErrors.INVALID_TYPES_ERROR:
      return res.status(400).json({
        status: "error",
        error: err.message,
        cause: err.cause,
      });

    case EErrors.DATABASE_ERROR:
      return res.status(500).json({
        status: "error",
        error: "Database error",
        cause: err.cause,
      });

    case EErrors.AUTH_ERROR:
      return res.status(401).json({
        status: "error",
        error: "Unauthorized",
      });

    case EErrors.NOT_FOUND_ERROR:
      return res.status(404).json({
        status: "error",
        error: err.message,
      });

    default:
      return res.status(500).json({
        status: "error",
        error: "Unhandled error",
        details: err.message,
        stack: err.stack,
      });
  }
};
