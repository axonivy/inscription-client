import { createWebSocketConnection, type Connection } from '@axonivy/jsonrpc';

export namespace IvyScriptLanguage {
  export async function startWebSocketClient(url: string, isMonacoReady: Promise<boolean>): Promise<any> {
    const webSocketUrl = new URL('ivy-script-lsp', url);
    const connection = await createWebSocketConnection(webSocketUrl);
    await isMonacoReady;
    return startClient(connection);
  }

  export async function startClient(connection: Connection) {
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
