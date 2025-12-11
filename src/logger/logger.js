import winston from "winston";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "yellow",
    info: "blue",
    http: "magenta",
    debug: "green",
  },
};

winston.addColors(customLevels.colors);

class LoggerSingleton {
  static #instance = null;

  constructor() {
    if (LoggerSingleton.#instance) {
      return LoggerSingleton.#instance;
    }

    this.logger = winston.createLogger({
      levels: customLevels.levels,
      level: "debug",

      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),

      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === "production" ? "info" : "debug",
        }),

        new winston.transports.File({
          filename: "./logs/errors.log",
          level: "error",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          ),
        }),
      ],
    });

    LoggerSingleton.#instance = this;
  }

  static getInstance() {
    if (!LoggerSingleton.#instance) {
      LoggerSingleton.#instance = new LoggerSingleton();
    }
    return LoggerSingleton.#instance;
  }
}

export default LoggerSingleton;
