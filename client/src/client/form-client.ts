import { MonacoLanguageClient } from 'monaco-languageclient';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import { ConnectionUtil } from './connection-util';

export namespace FormLanguage {
    export function registerLanguage() {
        // register Monaco languages
        monaco.languages.register({
            id: 'form',
            extensions: ['.form', '.form'],
            aliases: ['Form', 'form']
        });
    }

    export async function startWebSocketClient(url: string): Promise<MonacoLanguageClient> {
        registerLanguage();
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