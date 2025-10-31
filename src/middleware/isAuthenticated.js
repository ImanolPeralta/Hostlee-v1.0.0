export const isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.status(401).json({ error: "Debes iniciar sesión para comentar" });
};
