import { ConnectionUtil, type MessageConnection } from './connection-util';

export namespace IvyScriptLanguage {
  export async function startWebSocketClient(url: string, isMonacoReady: Promise<boolean>): Promise<any> {
    const webSocketUrl = ConnectionUtil.buildWebSocketUrl(url, '/ivy-script-lsp');
    const connection = await ConnectionUtil.createWebSocketConnection(webSocketUrl);
    await isMonacoReady;
    return startClient(connection);
  }

  export async function startClient(connection: MessageConnection) {
    const { MonacoLanguageClient } = await import('monaco-languageclient');
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
