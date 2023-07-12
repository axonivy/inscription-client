import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  EventCodeMeta,
  InscriptionAction,
  InscriptionClient,
  InscriptionData,
  InscriptionNotificationTypes,
  InscriptionRequestTypes,
  InscriptionSaveData,
  InscriptionValidation,
  VariableInfo,
  PID,
  RoleMeta,
  InscriptionDataArgs
} from '@axonivy/inscription-protocol';
import { createMessageConnection, Emitter } from 'vscode-jsonrpc';
import { Disposable } from 'vscode-ws-jsonrpc';
import { ConnectionUtil } from './connection-util';
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

  data(pid: PID): Promise<InscriptionData> {
    return this.sendRequest('data', { pid });
  }

  saveData(args: InscriptionSaveData): Promise<InscriptionValidation[]> {
    return this.sendRequest('saveData', { ...args });
  }

  validate(args: InscriptionDataArgs): Promise<InscriptionValidation[]> {
    return this.sendRequest('validate', args);
  }

  dialogStarts(pid: PID): Promise<CallableStart[]> {
    return this.sendRequest('meta/start/dialogs', { pid });
  }

  triggerStarts(pid: PID): Promise<CallableStart[]> {
    return this.sendRequest('meta/start/triggers', { pid });
  }

  callSubStarts(pid: PID): Promise<CallableStart[]> {
    return this.sendRequest('meta/start/calls', { pid });
  }

  roles(pid: PID): Promise<RoleMeta[]> {
    return this.sendRequest('meta/workflow/roles', { pid });
  }

  expiryErrors(pid: PID): Promise<ErrorMeta[]> {
    return this.sendRequest('meta/workflow/expiryErrors', { pid });
  }

  errorCodes(pid: string): Promise<EventCodeMeta[]> {
    return this.sendRequest('meta/workflow/errorCodes', { pid });
  }

  signalCodes(pid: string): Promise<EventCodeMeta[]> {
    return this.sendRequest('meta/workflow/signalCodes', { pid });
  }

  outScripting(pid: PID, location: string): Promise<VariableInfo> {
    return this.sendRequest('meta/scripting/out', { pid, location });
  }

  inScripting(pid: PID, location: string): Promise<VariableInfo> {
    return this.sendRequest('meta/scripting/in', { pid, location });
  }

  connectorOf(pid: PID): Promise<ConnectorRef> {
    return this.sendRequest('meta/connector/of', { pid });
  }

  action(action: InscriptionAction): void {
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
    const connection = await ConnectionUtil.createWebSocketConnection(url);
    const messageConnection = createMessageConnection(connection.reader, connection.writer);
    const client = new InscriptionClientJsonRpc(messageConnection);
    client.start();
    connection.reader.onClose(() => client.stop());
    return client;
  }
}
