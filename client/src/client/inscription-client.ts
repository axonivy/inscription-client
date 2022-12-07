import {
    createMessageConnection,
    Emitter,
    Event
} from 'vscode-jsonrpc';
import {
    Disposable, toSocket, WebSocketMessageReader, WebSocketMessageWriter
} from 'vscode-ws-jsonrpc';
import { Inscription, InscriptionNotificationTypes, InscriptionRequestTypes } from './inscription-protocol';
import { BaseRcpClient } from './rcp-client';

export interface InscriptionClient {
    initialize(): Promise<boolean>;
    userDialog(dialogId: number): Promise<Inscription.UserDialogData>;
    onUserDialogChanged: Event<Inscription.UserDialogData>
}

export class JsonRpcInscriptionClient extends BaseRcpClient implements InscriptionClient {
    protected onUserDialogChangedEmitter = new Emitter<Inscription.UserDialogData>();
    onUserDialogChanged = this.onUserDialogChangedEmitter.event;

    protected override setupConnection(): void {
        super.setupConnection();
        this.toDispose.push(this.onUserDialogChangedEmitter);
        this.onNotification('userDialogChanged', dialog => this.onUserDialogChangedEmitter.fire(dialog));
    }

    userDialog(dialogId: number): Promise<Inscription.UserDialogData> {
        return this.sendRequest('userDialog', { dialogId });
    }

    initialize(): Promise<boolean> {
        return this.sendRequest('initialize', undefined);
    }

    sendRequest<K extends keyof InscriptionRequestTypes>(command: K, args: InscriptionRequestTypes[K][0]): Promise<InscriptionRequestTypes[K][1]> {
        return args === undefined
            ? this.connection.sendRequest(command)
            : this.connection.sendRequest(command, args);
    }

    onNotification<K extends keyof InscriptionNotificationTypes>(kind: K, listener: (args: InscriptionNotificationTypes[K]) => any): Disposable {
        return this.connection.onNotification(kind, listener);
    }
}

export namespace InscriptionClient {
    export function startWebSocketClient(url: string): Promise<InscriptionClient> {
        return new Promise<InscriptionClient>(resolve => {
            const webSocket = new WebSocket(url);
            webSocket.onopen = async () => {
                const socket = toSocket(webSocket);
                const reader = new WebSocketMessageReader(socket);
                const writer = new WebSocketMessageWriter(socket);
                const connection = createMessageConnection(reader, writer);
                const client = new JsonRpcInscriptionClient(connection);
                client.start();
                reader.onClose(() => client.stop());
                resolve(client);
            };
            webSocket.onerror = _event => alert('Connection to server errored. Please make sure that the server is running');
        });
    }
}