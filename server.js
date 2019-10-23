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

  // 发送欢迎信息给客户端
  // ws.send(clientName);
  ws.on('error', () => console.log('errored'));

  ws.on('message', function incoming(message) {
    console.log('received: %s from %s', message, clientName);

    // 广播消息给所有客户端
    server.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
    	// console.log(clientName)
        client.send(message);
      }
    });

  });

});

