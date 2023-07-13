import {
  DEFAULT_DATA,
  CallableStart,
  ErrorMeta,
  InscriptionClient,
  InscriptionData,
  InscriptionSaveData,
  InscriptionType,
  InscriptionValidation,
  VariableInfo,
  RoleMeta,
  ElementType,
  ElementData,
  ConnectorRef,
  InscriptionAction,
  PID,
  EventCodeMeta,
  InscriptionDataArgs
} from '@axonivy/inscription-protocol';
import { Emitter } from 'vscode-jsonrpc';
import { deepmerge } from 'deepmerge-ts';
import { DataMock } from './data-mock';
import { ValidationMock } from './validation-mock';
import { MetaMock } from './meta-mock';

export class InscriptionClientMock implements InscriptionClient {
  private elementData = {} as ElementData;
  constructor(readonly readonly = false, readonly type: ElementType = 'UserTask') {}

  protected onValidationEmitter = new Emitter<InscriptionValidation[]>();
  onValidation = this.onValidationEmitter.event;
  protected onDataChangedEmitter = new Emitter<InscriptionData>();
  onDataChanged = this.onDataChangedEmitter.event;

  initialize(): Promise<boolean> {
    return Promise.resolve(true);
  }

  data(pid: PID): Promise<InscriptionData> {
    const inscriptionType: InscriptionType = {
      id: this.type,
      label: this.type,
      shortLabel: this.type,
      description: this.type,
      iconId: this.type
    };
    this.elementData = DataMock.mockForType(this.type) as ElementData;
    this.onValidationEmitter.fire(ValidationMock.validateData({ data: this.elementData, pid, type: inscriptionType.id }));
    return Promise.resolve({
      pid,
      type: inscriptionType,
      readonly: this.readonly,
      data: deepmerge(DEFAULT_DATA, this.elementData),
      defaults: DEFAULT_DATA.config
    });
  }

  saveData(args: InscriptionSaveData): Promise<InscriptionValidation[]> {
    return Promise.resolve(ValidationMock.validateData(args));
  }

  validate(args: InscriptionDataArgs): Promise<InscriptionValidation[]> {
    return Promise.resolve(ValidationMock.validateData({ pid: args.pid, data: this.elementData, type: this.type }));
  }

  dialogStarts(pid: PID): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  triggerStarts(pid: PID): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  callSubStarts(pid: PID): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  roles(pid: PID): Promise<RoleMeta[]> {
    return Promise.resolve(MetaMock.ROLES);
  }

  expiryErrors(pid: PID): Promise<ErrorMeta[]> {
    return Promise.resolve(MetaMock.EXPIRY_ERRORS);
  }

  errorCodes(pid: string): Promise<EventCodeMeta[]> {
    return Promise.resolve([]);
  }

  signalCodes(pid: string): Promise<EventCodeMeta[]> {
    return Promise.resolve([]);
  }

  outScripting(pid: PID, location: string): Promise<VariableInfo> {
    if (location === 'result') {
      return Promise.resolve(JSON.parse(JSON.stringify(MetaMock.RESULT_VAR_INFO)));
    }
    return Promise.resolve(MetaMock.OUT_VAR_INFO);
  }

  inScripting(pid: string, location: string): Promise<VariableInfo> {
    return Promise.resolve(MetaMock.IN_VAR_INFO);
  }

  connectorOf(pid: PID): Promise<ConnectorRef> {
    if (pid.includes('f1')) {
      return Promise.resolve(MetaMock.CONNECTOR_OF);
    }
    //@ts-ignore
    return Promise.resolve(undefined);
  }

  action(action: InscriptionAction): void {
    alert(`action: [kind: ${action.kind}, pid: ${action.pid}, payload: ${action.payload}]`);
  }
}
