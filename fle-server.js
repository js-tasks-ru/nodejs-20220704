const http = require('http');
const fs = require('fs');

const server = new Server();

// tasks queue: []

server.on('request', (req, res) => {
    switch (req.method) {
        case 'GET':
            fs.createReadStream('file.png')
                .on('error', (err) => {
                    if (err.code === 'ENOENT') {
                        res.status = 404;
                        res.end('not found');
                    } else {
                        res.status = 500;
                        res.end('internal error');
                    }
                })
                .pipe(res);
            break;
        case 'DELETE':
            fs.unlink('file.png', (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        res.status = 404;
                        res.end('not found');
                    } else {
                        res.status = 500;
                        res.end('internal error');
                    }
                } else {
                    res.end('ok');
                }
            });
            break;
        default:
            res.end('not implemented');
    }
});

server.listen(3000);