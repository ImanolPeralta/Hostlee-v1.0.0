import LoggerSingleton from "../logger/logger.js";

export const addLogger = (req, res, next) => {
    const logger = LoggerSingleton.getInstance().logger;

    req.logger = logger;

    logger.http(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);

    next();
}