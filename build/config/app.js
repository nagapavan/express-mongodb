"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const errorHandler_1 = tslib_1.__importDefault(require("@server/middleware/errorHandler"));
const createServer = () => {
    const app = (0, express_1.default)();
    // Process urlencoded data in the request 
    app.use(express_1.default.urlencoded({ extended: true }));
    /**
     * Security related middleware
     */
    // enable Cors for all routes - Cross-origin resource sharing
    app.use((0, cors_1.default)());
    app.use(helmet_1.default.noSniff());
    app.use(helmet_1.default.xssFilter());
    app.use(helmet_1.default.hidePoweredBy());
    /**
     * Custom Routes
     */
    // For health check
    app.get('/health', (_req, res) => {
        res.status(200).send('UP');
    });
    // app.use("/");
    // catch-all unhandled errors: errorHandler should always be the last middleware
    app.use(errorHandler_1.default);
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=app.js.map