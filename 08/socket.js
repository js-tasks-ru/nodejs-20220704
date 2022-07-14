const socketIO = require('socket.io');
const socketIORedis = require('socket.io-redis');

// let io = null;
// module.exports = io;

function socket(server) {
  io = socketIO(server);

  io.adapter(socketIORedis('redis://127.0.0.1:6379/1'));

  io.use((socket, cb) => {
    // console.log(socket.handshake.headers['authorization']);
    socket.user = { name: 'Ivan' };
    cb();
  });

  io.on('connection', socket => {
    console.log('connection', socket.id);

    socket.on('client_user_message', (msg) => {
      console.log('message from client', msg, 'from', socket.user);
      // socket.emit('server_user_message', 'hello world');
      socket.broadcast.emit('server_user_message', msg);
      // io.emit('server_system_message');

      /**
       * Message.create({ text: msg, user: socket.user });
       */

       socket.emit('lala', (...args) => {
        console.log(args);
      });
    });

    socket.on('client_user_typing', isTyping => {
      console.log('user typing', isTyping);
    });

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id);
    });
  });
}

module.exports = socket;
