import type {
  InscriptionActionArgs,
  InscriptionClient,
  InscriptionData,
  InscriptionNotificationTypes,
  InscriptionRequestTypes,
  InscriptionSaveData,
  InscriptionValidation,
  InscriptionMetaRequestTypes,
  InscriptionElementContext
} from '@axonivy/inscription-protocol';
import type { Disposable } from 'vscode-jsonrpc';
import { createMessageConnection, Emitter } from 'vscode-jsonrpc';
import { ConnectionUtil, type MessageConnection } from './connection-util';
import { BaseRcpClient } from './rcp-client';

export class InscriptionClientJsonRpc extends BaseRcpClient implements InscriptionClient {
  protected onDataChangedEmitter = new Emitter<InscriptionData>();
  onDataChanged = this.onDataChangedEmitter.event;
  protected onValidationEmitter = new Emitter<InscriptionValidation[]>();
  onValidation = this.onValidationEmitter.event;

  protected override setupConnection(): void {
    super.setupConnection();
    this.toDispose.push(this.onDataChangedEmitter);
    this.onNotification('dataChanged', data => this.onDataChangedEmitter.fire(data));
    this.toDispose.push(this.onValidationEmitter);
    this.onNotification('validation', validations => this.onValidationEmitter.fire(validations));
  }

  initialize(): Promise<boolean> {
    return this.sendRequest('initialize', undefined);
  }

  data(context: InscriptionElementContext): Promise<InscriptionData> {
    return this.sendRequest('data', { ...context });
  }

  saveData(saveData: InscriptionSaveData): Promise<InscriptionValidation[]> {
    return this.sendRequest('saveData', { ...saveData });
  }

  validate(context: InscriptionElementContext): Promise<InscriptionValidation[]> {
    return this.sendRequest('validate', { ...context });
  }

  meta<TMeta extends keyof InscriptionMetaRequestTypes>(
    path: TMeta,
    args: InscriptionMetaRequestTypes[TMeta][0]
  ): Promise<InscriptionMetaRequestTypes[TMeta][1]> {
    return this.sendRequest(path, args);
  }

  action(action: InscriptionActionArgs): void {
    this.sendNotification('action', action);
  }

  sendNotification<K extends keyof InscriptionRequestTypes>(command: K, args: InscriptionRequestTypes[K][0]): void {
    args === undefined ? this.connection.sendNotification(command) : this.connection.sendNotification(command, args);
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

export namespace InscriptionClientJsonRpc {
  export async function startWebSocketClient(url: string): Promise<InscriptionClient> {
    const webSocketUrl = ConnectionUtil.buildWebSocketUrl(url, '/ivy-inscription-lsp');
    const connection = await ConnectionUtil.createWebSocketConnection(webSocketUrl);
    return startClient(connection);
  }

  export async function startClient(connection: MessageConnection) {
    const messageConnection = createMessageConnection(connection.reader, connection.writer);
    const client = new InscriptionClientJsonRpc(messageConnection);
    client.start();
    connection.reader.onClose(() => client.stop());
    return client;
  }
}
