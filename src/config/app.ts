import express from 'express';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';
import * as winston from 'winston';

import errorHandler from '@server/middleware/errorHandler';

const createServer = (): express.Application => {
    const app = express();
    // Process urlencoded data in the request 
    app.use(express.urlencoded({ extended: true }));

    /**
     * Security related middleware
     */
    // enable Cors for all routes - Cross-origin resource sharing
    app.use(cors());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(helmet.hidePoweredBy());

    // Winston HTTP logger
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}}',
        expressFormat: true,
        colorize: true,
        ignoreRoute: function (_req, _res) { return false; }
    }));

    /** 
     * Custom Routes
     */
    // For health check
    app.get('/health', (_req, res) => {
        res.status(200).send('UP');
    });

    // app.use("/");

    // catch-all unhandled errors: errorHandler should always be the last middleware
    app.use(errorHandler);

    return app;
};

export { createServer };
