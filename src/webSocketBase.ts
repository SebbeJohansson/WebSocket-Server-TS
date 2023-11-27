import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

export class WebSocketBase {
  private socket: WebSocket.Server;

  public path: string = '';

  constructor(server: Server, path: string) {
    const socketServer = new WebSocketServer({ noServer: true, path });
    this.socket = socketServer;

    server.on('upgrade', function upgrade(request, socket, head) {
      if (!request) return;
      const pathname = request.url;

      console.log('upgrade path on server');
      if (pathname === path) {
        socketServer.handleUpgrade(request, socket, head, function done(ws) {
          socketServer.emit('connection', ws, request);
        });
      }
    });

    this.socket.on('connection', (ws: WebSocket) => {
      console.log('New client connected');
      this.initialize(ws);
    });
  }

  public getSocket(): WebSocket.Server {
    return this.socket;
  }

  initialize(ws: WebSocket): void {
    console.log('Default Initalize method that is supposed to be overridden');
  }
}
