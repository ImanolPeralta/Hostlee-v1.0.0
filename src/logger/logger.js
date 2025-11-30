// import { createLogger, format, transports } from 'winston';
// import path from 'path';

// const customLevels = {
//     levels: { debug: 0, http: 1, info: 2, warning: 3, error: 4, fatal: 5 },
// };

// const devLogger = createLogger({
//     levels: customLevels.levels,
//     level: 'debug',
//     format: format.combine(format.timestamp(), format.colorize(), format.simple()),
//     transports: [new transports.Console()],
// });

// const prodLogger = createLogger({
//     levels: customLevels.levels,
//     level: 'info',
//     format: format.combine(format.timestamp(), format.json()),
//     transports: [
//         new transports.Console(),
//         new transports.File({ filename: path.join(process.cwd(), 'errors.log'), level: 'error' }),
//     ],
// });

// const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

// export default logger;