const http = require('node:http');
const handler = require('./handler');

const server = new http.Server();

server.on('request', handler);

server.listen(3000);