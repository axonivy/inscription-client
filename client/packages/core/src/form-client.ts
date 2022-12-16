import { MonacoLanguageClient } from 'monaco-languageclient';

import { ConnectionUtil } from './connection-util';

export namespace FormLanguage {
  export async function startWebSocketClient(url: string): Promise<MonacoLanguageClient> {
    const connection = await ConnectionUtil.createWebSocketConnection(url);
    const client = new MonacoLanguageClient({
      name: 'Form Language Client',
      clientOptions: { documentSelector: ['form'] },
      connectionProvider: { get: async () => connection }
    });
    client.start();
    connection.reader.onClose(() => client.stop());
    return client;
  }
}
