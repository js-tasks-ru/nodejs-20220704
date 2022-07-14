const http = require('node:http');

const server = new http.Server();

//                 3s   3s    3s
// task queue : [req1, req2, req3]
server.on('request', (req, res) => {
    // const requestStart = Date.now();
    // while(Date.now() - requestStart < 3000) {}

    setTimeout(() => {
        res.end('hello world');
    }, 3000);
});

server.listen(3000);