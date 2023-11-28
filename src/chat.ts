import WebSocket from 'ws';
import { WebSocketBase, Message, MessageType } from './webSocketBase';

class MessageData {
  name!: string;
  text!: string;
}

class ChatMessage implements Message {
  type: MessageType = MessageType.Data;
  data: MessageData = new MessageData();
}

export class Chat extends WebSocketBase {
  initialize(ws: WebSocket): void {
    console.log('Chat Initalize method');
    console.log(ws);
    ws.on('message', (message: string) => {
      // TODO: Should catch json parse error here.
      const messageObject: Message = JSON.parse(message);
      const messageType: keyof typeof MessageType = messageObject.type as keyof typeof MessageType;

      if (!messageObject.type || messageType === MessageType[MessageType.None]) return;
      if (!this.authenticated) {
        if (messageType === MessageType[MessageType.Authentication] && messageObject.data === process.env.CHAT_AUTH_TOKEN) {
          console.log('Client authenticated');
          this.authenticated = true;
        }
        else {
          console.log('Client not authenticated');
          ws.close();
          return;
        }
      }
      else if (messageObject.type === MessageType.Data) {
        const chatMessage = messageObject as ChatMessage;
        console.log(`Received data: ${chatMessage.data}`);
      }
      console.log(`Received message: ${message}`);
      ws.send(`Server received your wonderful message: ${message}`);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  }
}
