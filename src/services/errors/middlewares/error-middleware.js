import { EErrors } from "../error-enum";

export const errorHandler = (err, req, res, next) => {
  console.log("❌ Error capturado:");
  console.log("Nombre:", err.name);
  console.log("Código:", err.code);
  console.log("Causa:", err.cause);

  switch (err.code) {
    case EErrors.INVALID_TYPES_ERROR:
      return res.status(400).send({
        status: "error",
        error: err.message,
        cause: err.cause,
      });

    case EErrors.DATABASE_ERROR:
      return res.status(500).send({
        status: "error",
        error: "Database error",
        cause: err.cause,
      });

    case EErrors.AUTH_ERROR:
      return res.status(401).send({
        status: "error",
        error: "Unauthorized",
      });

    case EErrors.NOT_FOUND_ERROR:
      return res.status(404).send({
        status: "error",
        error: err.message,
      });

    default:
      return res.status(500).send({
        status: "error",
        error: "Unhandled error",
        details: err.message,
      });
  }
};
