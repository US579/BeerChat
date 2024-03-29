const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('open', function open() {
  console.log('connected');
});

server.on('close', function close() {
  console.log('disconnected');
});


server.on('connection', function connection(ws, req) {
  const ip = req.connection.remoteAddress;
  const port = req.connection.remotePort;
  const clientName =port;

  console.log('%s is connected', clientName)


  ws.on('error', () => console.log('errored'));
  ws.on('message', function incoming(message) {
    console.log('received: %s from %s', message, clientName);

    // boardcast to all the users
    server.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(clientName+"@"+message);
      }
    });
  });
});
