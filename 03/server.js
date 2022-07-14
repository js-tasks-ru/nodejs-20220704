const http = require('http');
const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');
const config = require('./config');

const server = new http.Server();

server.on('request', (req, res) => {
    switch (req.method) {
        case 'GET':
            res.end('hello world');
            break;
        case 'POST':
            const body = [];
            req.on('data', chunk => body.push(chunk));
            req.on('end', () => {
                const request = Buffer.concat(body).toString('utf-8');
                const { a, b } = JSON.parse(request);

                const sum = a + b;
                const filename = uuid();
                fs.writeFile(
                    path.join(config.resultsFolderPath, filename),
                    sum.toString(),
                    (err) => {
                        if (err) {
                            console.log(err);
                            res.statusCode = 500;
                            res.end('internal error');
                        } else {
                            res.end(filename);
                        }
                    }
                );
            });

            break;
        default:
            res.statusCode = 400;
            res.end('wrong method');
    }
});

module.exports = server;