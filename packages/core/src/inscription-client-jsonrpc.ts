import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  EventCodeMeta,
  InscriptionActionArgs,
  InscriptionClient,
  InscriptionData,
  InscriptionNotificationTypes,
  InscriptionRequestTypes,
  InscriptionSaveData,
  InscriptionValidation,
  VariableInfo,
  RoleMeta,
  InscriptionContext
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

  data(context: InscriptionContext): Promise<InscriptionData> {
    return this.sendRequest('data', { ...context });
  }

  saveData(saveData: InscriptionSaveData): Promise<InscriptionValidation[]> {
    return this.sendRequest('saveData', { ...saveData });
  }

  validate(context: InscriptionContext): Promise<InscriptionValidation[]> {
    return this.sendRequest('validate', { ...context });
  }

  dialogStarts(context: InscriptionContext): Promise<CallableStart[]> {
    return this.sendRequest('meta/start/dialogs', { ...context });
  }

  triggerStarts(context: InscriptionContext): Promise<CallableStart[]> {
    return this.sendRequest('meta/start/triggers', { ...context });
  }

  callSubStarts(context: InscriptionContext): Promise<CallableStart[]> {
    return this.sendRequest('meta/start/calls', { ...context });
  }

  roles(context: InscriptionContext): Promise<RoleMeta[]> {
    return this.sendRequest('meta/workflow/roles', { ...context });
  }

  expiryErrors(context: InscriptionContext): Promise<ErrorMeta[]> {
    return this.sendRequest('meta/workflow/expiryErrors', { ...context });
  }

  errorCodes(context: InscriptionContext): Promise<EventCodeMeta[]> {
    return this.sendRequest('meta/workflow/errorCodes', { ...context });
  }

  signalCodes(context: InscriptionContext): Promise<EventCodeMeta[]> {
    return this.sendRequest('meta/workflow/signalCodes', { ...context });
  }

  outScripting(context: InscriptionContext, location: string): Promise<VariableInfo> {
    return this.sendRequest('meta/scripting/out', { context: context, location });
  }

  inScripting(context: InscriptionContext, location: string): Promise<VariableInfo> {
    return this.sendRequest('meta/scripting/in', { context: context, location });
  }

  connectorOf(context: InscriptionContext): Promise<ConnectorRef> {
    return this.sendRequest('meta/connector/of', { ...context });
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
    const connection = await ConnectionUtil.createWebSocketConnection(url);
    const messageConnection = createMessageConnection(connection.reader, connection.writer);
    const client = new InscriptionClientJsonRpc(messageConnection);
    client.start();
    connection.reader.onClose(() => client.stop());
    return client;
  }
}
