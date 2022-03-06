import supertest from 'supertest';

import { createServer } from '@config/app';

describe('server', () => {
    const app = createServer();

    it('Health check test', (done) => {
        supertest(app).get('/health').expect('UP', done);
    });
});
