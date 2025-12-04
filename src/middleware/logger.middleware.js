import logger from "../logger/logger.js";

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} $ {req.url} - ${new Date().toLocaleString()}`);
    next();
}