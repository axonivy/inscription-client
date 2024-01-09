import { MonacoLanguageClient } from 'monaco-languageclient';

import { ConnectionUtil, type MessageConnection } from './connection-util';

export namespace IvyScriptLanguage {
  export async function startWebSocketClient(url: string): Promise<MonacoLanguageClient> {
    const webSocketUrl = ConnectionUtil.buildWebSocketUrl(url, '/ivy-script-lsp');
    const connection = await ConnectionUtil.createWebSocketConnection(webSocketUrl);
    return startClient(connection);
  }

  export async function startClient(connection: MessageConnection) {
    const client = new MonacoLanguageClient({
      name: 'IvyScript Language Client',
      clientOptions: { documentSelector: [{ language: 'ivyScript' }, { language: 'ivyMacro' }] },
      connectionProvider: { get: async () => connection }
    });
    client.start();
    connection.reader.onClose(() => client.stop());
    return client;
  }
}
