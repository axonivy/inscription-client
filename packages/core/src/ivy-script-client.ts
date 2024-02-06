import { MonacoLanguageClient } from 'monaco-languageclient';

import { ConnectionUtil, type MessageConnection } from './connection-util';

export namespace IvyScriptLanguage {
  export async function startWebSocketClient(url: string): Promise<MonacoLanguageClient> {
    console.time('startWebSocketClient');
    const webSocketUrl = ConnectionUtil.buildWebSocketUrl(url, '/ivy-script-lsp');
    const connection = await ConnectionUtil.createWebSocketConnection(webSocketUrl);
    console.timeEnd('startWebSocketClient');
    return startClient(connection);
  }

  export async function startClient(connection: MessageConnection) {
    console.time('IvyScriptLanguage.startClient');
    const client = new MonacoLanguageClient({
      name: 'IvyScript Language Client',
      clientOptions: { documentSelector: [{ language: 'ivyScript' }, { language: 'ivyMacro' }] },
      connectionProvider: { get: async () => connection }
    });
    client.start();
    connection.reader.onClose(() => client.stop());
    console.timeEnd('IvyScriptLanguage.startClient');
    return client;
  }
}
