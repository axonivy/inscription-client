import { MessageReader, MessageWriter } from 'vscode-jsonrpc';
import { toSocket, WebSocketMessageReader, WebSocketMessageWriter } from 'vscode-ws-jsonrpc';

export interface MessageConnection {
  reader: MessageReader;
  writer: MessageWriter;
}

export namespace ConnectionUtil {
  export async function createWebSocketConnection(url: string): Promise<MessageConnection> {
    return new Promise<MessageConnection>((resolve, reject) => {
      const webSocket = new WebSocket(url);
      webSocket.onopen = async () => {
        const socket = toSocket(webSocket);
        const reader = new WebSocketMessageReader(socket);
        const writer = new WebSocketMessageWriter(socket);
        const connection: MessageConnection = { reader, writer };
        resolve(connection);
      };
      webSocket.onerror = () => reject('Connection could not be established.');
    });
  }
}
