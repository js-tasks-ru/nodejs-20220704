const assert = require('assert');
const server = require('./server');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * 1. run server
 * 2. make request
 * 3. check request
 * 4. stop server
 */

describe('server tests', () => {
    before('run server', (done) => {
        fs.mkdirSync(config.resultsFolderPath);
        server.listen(3005, done);
    });

    after('stop server', (done) => {
        fs.rmdirSync(config.resultsFolderPath, {
            recursive: true,
            force: true,
        });
        server.close(done);
    });

    it('GET request', async () => {
        // const response = await fetch('http://localhost:3005', {
        //     keepalive: false,
        // });
        // const body = await response.text();

        const response = await axios.get('http://localhost:3005');

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data, 'hello world');
    });

    it('PATCH', async () => {
        const response = await axios.patch('http://localhost:3005', {}, {
            validateStatus: () => true,
        });

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.data, 'wrong method');
    });

    it('POST', async () => {
        const response = await axios.post('http://localhost:3005', {
            a: 10, b: 20,
        });

        assert.strictEqual(response.status, 200);
        assert.ok(response.data.length);

        const filepath = path.join(config.resultsFolderPath, response.data);

        assert.ok(fs.existsSync(filepath));

        const content = fs.readFileSync(filepath, 'utf-8');

        assert.strictEqual(content, '30');
    });
});