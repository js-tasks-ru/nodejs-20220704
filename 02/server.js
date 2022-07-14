const http = require('node:http');
const zlib = require('node:zlib');
const ReplaceStream = require('./replace');

const server = new http.Server();

server.on('request', (req, res) => {
    // req.url -> /?from=apple&to=strawberry
    const url = new URL(req.url, 'http://localhost:3000');

    const replacer = new ReplaceStream({
        from: url.searchParams.get('from'),
        to: url.searchParams.get('to'),
    });

    res.setHeader('content-encoding', 'gzip');
    req
        .pipe(replacer)
        .pipe(zlib.createGzip())
        .pipe(res);
});

server.listen(3000);