import { createServer } from 'http';
import { WebSocketBase } from './webSocketBase';
import { Chat } from './chat';
const server = createServer();
const webSocketInstances = {
  chat: new Chat(server, '/chat'),
  chat2: new WebSocketBase(server, '/chat2'),
};

server.listen(80);
