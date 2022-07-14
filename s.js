const http = require('http');

const server = new http.Server();

server.on('request', (req, res) => {
  req.on('close', () => console.log('req close'));
  res.on('close', () => console.log('res close'));
  res.end('hello world');
});

server.listen(3000);