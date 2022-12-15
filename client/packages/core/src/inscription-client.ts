import { createMessageConnection, Emitter, Event } from 'vscode-jsonrpc';
import { Disposable } from 'vscode-ws-jsonrpc';
import { ConnectionUtil } from './connection-util';
import { DEFAULT_DATA, UserDialogData } from './inscription-model';
import { InscriptionNotificationTypes, InscriptionRequestTypes } from './inscription-protocol';
import { BaseRcpClient } from './rcp-client';

export interface InscriptionClient {
  initialize(): Promise<boolean>;
  userDialog(dialogId: number): Promise<UserDialogData>;
  onUserDialogChanged: Event<UserDialogData>;
}

export class InscriptionClientMock implements InscriptionClient {
  initialize(): Promise<boolean> {
    return Promise.resolve(true);
  }
  userDialog(dialogId: number): Promise<UserDialogData> {
    return Promise.resolve(DEFAULT_DATA);
  }

  onUserDialogChanged = new Emitter<UserDialogData>().event;
}

export class JsonRpcInscriptionClient extends BaseRcpClient implements InscriptionClient {
  protected onUserDialogChangedEmitter = new Emitter<UserDialogData>();
  onUserDialogChanged = this.onUserDialogChangedEmitter.event;

  protected override setupConnection(): void {
    super.setupConnection();
    this.toDispose.push(this.onUserDialogChangedEmitter);
    this.onNotification('userDialogChanged', dialog => this.onUserDialogChangedEmitter.fire(dialog));
  }

  userDialog(dialogId: number): Promise<UserDialogData> {
    return this.sendRequest('userDialog', { dialogId });
  }

  initialize(): Promise<boolean> {
    return this.sendRequest('initialize', undefined);
  }

  sendRequest<K extends keyof InscriptionRequestTypes>(
    command: K,
    args: InscriptionRequestTypes[K][0]
  ): Promise<InscriptionRequestTypes[K][1]> {
    return args === undefined ? this.connection.sendRequest(command) : this.connection.sendRequest(command, args);
  }

  onNotification<K extends keyof InscriptionNotificationTypes>(
    kind: K,
    listener: (args: InscriptionNotificationTypes[K]) => any
  ): Disposable {
    return this.connection.onNotification(kind, listener);
  }
}

export namespace InscriptionClient {
  export async function startWebSocketClient(url: string): Promise<InscriptionClient> {
    const connection = await ConnectionUtil.createWebSocketConnection(url);
    const messageConnection = createMessageConnection(connection.reader, connection.writer);
    const client = new JsonRpcInscriptionClient(messageConnection);
    client.start();
    connection.reader.onClose(() => client.stop());
    return client;
  }
}
