import * as moduleAlias from 'module-alias';

const sourcePath = 'src';


moduleAlias.addAliases({
    '@server': sourcePath,
    '@config': `${sourcePath}/config`,
    '@controller': `${sourcePath}/controller`,
    '@domain': `${sourcePath}/domain`,
    '@middleware': `${sourcePath}/middleware`
});

import { createServer } from '@config/app';
import { AddressInfo } from 'net';
import http from 'http';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '8080';

const startServer = async () => {
    const app = await createServer();
    const server = http.createServer(app).listen({ host, port }, () => {
        const addrInfo = server.address() as AddressInfo;
        console.log(`Server ready at http://${addrInfo.address}:${addrInfo.port}`);
    });
    const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signalTraps.forEach(sigType => {
        process.once(sigType, async () => {
            console.log(`process.once : ${sigType}`);
            server.close(() => {
                console.log('HTTP server closed');
            });
        });
    });
};

startServer();
