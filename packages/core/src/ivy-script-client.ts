import { MonacoLanguageClient } from 'monaco-languageclient';

import { ConnectionUtil } from './connection-util.js';

export namespace IvyScriptLanguage {
  export async function startWebSocketClient(url: string): Promise<MonacoLanguageClient> {
    const connection = await ConnectionUtil.createWebSocketConnection(url);
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
