import WebSocket from 'ws';
import { WebSocketBase } from './webSocketBase';

export class Chat extends WebSocketBase {
  initialize(ws: WebSocket): void {
    console.log('Chat Initalize method');
    ws.on('message', (message: string) => {
      console.log(`Received message: ${message}`);
      ws.send(`Server received your fucking message: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  }
}
