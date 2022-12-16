import { createMessageConnection, Emitter, Event } from 'vscode-jsonrpc';
import { Disposable } from 'vscode-ws-jsonrpc';
import { ConnectionUtil } from './connection-util';
import { InscriptionData, USER_DIALOG_DATA } from './data';
import { InscriptionNotificationTypes, InscriptionRequestTypes } from './inscription-protocol';
import { DialogStart, DIALOG_STARTS_META, Variable } from './meta';
import { BaseRcpClient } from './rcp-client';
import { InscriptionValidation } from './validation/inscription-validation';

export interface InscriptionClient {
  initialize(): Promise<boolean>;
  data(pid: string): Promise<InscriptionData>;

  dialogStarts(): Promise<DialogStart[]>;
  outMapping(): Promise<Variable[]>;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}

export class InscriptionClientMock implements InscriptionClient {
  initialize(): Promise<boolean> {
    return Promise.resolve(true);
  }

  data(pid: string): Promise<InscriptionData> {
    return Promise.resolve({ type: 'UserDialog', readonly: false, data: USER_DIALOG_DATA });
  }

  dialogStarts(): Promise<DialogStart[]> {
    return Promise.resolve(DIALOG_STARTS_META);
  }
  outMapping(): Promise<Variable[]> {
    return Promise.resolve([]);
  }

  onDataChanged = new Emitter<InscriptionData>().event;
  onValidation = new Emitter<InscriptionValidation[]>().event;
}

export class JsonRpcInscriptionClient extends BaseRcpClient implements InscriptionClient {
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

  data(pid: string): Promise<InscriptionData> {
    return this.sendRequest('data', { pid });
  }

  dialogStarts(): Promise<DialogStart[]> {
    return this.sendRequest('dialogStarts', {});
  }

  outMapping(): Promise<Variable[]> {
    return this.sendRequest('outMapping', {});
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
