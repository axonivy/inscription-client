import { MonacoLanguageClient } from 'monaco-languageclient';
import {
    toSocket,
    WebSocketMessageReader,
    WebSocketMessageWriter
} from 'vscode-ws-jsonrpc';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

export namespace FormLanguage {
    export function registerLanguage() {
        // register Monaco languages
        monaco.languages.register({
            id: 'form',
            extensions: ['.form', '.form'],
            aliases: ['Form', 'form']
        });
    }

    export function startWebSocketClient(url: string): Promise<MonacoLanguageClient> {
        registerLanguage();

        return new Promise<MonacoLanguageClient>(resolve => {
            const webSocket = new WebSocket(url);
            webSocket.onopen = () => {
                const socket = toSocket(webSocket);
                const reader = new WebSocketMessageReader(socket);
                const writer = new WebSocketMessageWriter(socket);
                const client = new MonacoLanguageClient({
                    name: 'Form Language Client',
                    clientOptions: { documentSelector: ['form'] },
                    connectionProvider: { get: () => { return Promise.resolve({ reader: reader, writer: writer }) } }
                });
                client.start();
                reader.onClose(() => client.stop());
                resolve(client);
            };
            webSocket.onerror = _event => alert('Connection to server errored. Please make sure that the server is running');
        });
    }
}