"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moduleAlias = tslib_1.__importStar(require("module-alias"));
const sourcePath = 'src';
moduleAlias.addAliases({
    '@server': sourcePath,
    '@config': `${sourcePath}/config`,
    '@controller': `${sourcePath}/controller`,
    '@domain': `${sourcePath}/domain`,
    '@middleware': `${sourcePath}/middleware`
});
const app_1 = require("@config/app");
const http_1 = tslib_1.__importDefault(require("http"));
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';
const startServer = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const app = yield (0, app_1.createServer)();
    const server = http_1.default.createServer(app).listen({ host, port }, () => {
        const addrInfo = server.address();
        console.log(`Server ready at http://${addrInfo.address}:${addrInfo.port}`);
    });
    const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signalTraps.forEach(sigType => {
        process.once(sigType, () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            console.log(`process.once : ${sigType}`);
            server.close(() => {
                console.log(`HTTP server closed`);
            });
        }));
    });
});
startServer();
//# sourceMappingURL=index.js.map