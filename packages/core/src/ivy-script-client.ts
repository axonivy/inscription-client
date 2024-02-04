import { ConnectionUtil, type MessageConnection } from './connection-util';

export namespace IvyScriptLanguage {
  export async function startWebSocketClient(url: string, isMonacoReady: Promise<boolean>): Promise<any> {
    console.time('IvyScriptLanguage.startWebSocketClient');
    const webSocketUrl = ConnectionUtil.buildWebSocketUrl(url, '/ivy-script-lsp');
    const connection = await ConnectionUtil.createWebSocketConnection(webSocketUrl);
    console.timeLog('IvyScriptLanguage.startWebSocketClient', '- Waiting for Monaco Editor...');
    await isMonacoReady;
    console.timeEnd('IvyScriptLanguage.startWebSocketClient');
    return startClient(connection);
  }

  export async function startClient(connection: MessageConnection) {
    console.time('IvyScriptLanguage.startClient');
    const { MonacoLanguageClient } = await import('monaco-languageclient');
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
