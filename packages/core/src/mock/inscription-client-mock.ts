import {
  DEFAULT_DATA,
  CallableStart,
  ExpiryError,
  InscriptionClient,
  InscriptionData,
  InscriptionSaveData,
  InscriptionType,
  InscriptionValidation,
  MappingInfo,
  Role,
  ElementType
} from '@axonivy/inscription-protocol';
import { Emitter } from 'vscode-jsonrpc';
import { DataMock } from './data';
import { MetaMock } from './meta';
import { ValidationMock } from './validation';
import { deepmerge } from 'deepmerge-ts';

export class InscriptionClientMock implements InscriptionClient {
  constructor(readonly readonly = false, readonly type: ElementType = 'UserTask') {}

  protected onValidationEmitter = new Emitter<InscriptionValidation[]>();
  onValidation = this.onValidationEmitter.event;
  protected onDataChangedEmitter = new Emitter<InscriptionData>();
  onDataChanged = this.onDataChangedEmitter.event;

  initialize(): Promise<boolean> {
    return Promise.resolve(true);
  }

  data(pid: string): Promise<InscriptionData> {
    const inscriptionType: InscriptionType = {
      id: this.type,
      label: this.type,
      shortLabel: this.type,
      description: this.type,
      iconId: this.type
    };
    let data: any = DataMock.NAME;
    if (this.type === 'UserTask' || this.type === 'DialogCall') {
      data = DataMock.USER_TASK;
    }
    if (this.type === 'TaskSwitchGateway') {
      data = DataMock.TASK_SWITCH_GATEWAY;
    }
    this.onValidationEmitter.fire(ValidationMock.validateData({ data, pid, type: inscriptionType.id }));
    return Promise.resolve({
      pid,
      type: inscriptionType,
      readonly: this.readonly,
      data: deepmerge(DEFAULT_DATA, data),
      defaults: DEFAULT_DATA.config
    });
  }

  saveData(args: InscriptionSaveData): Promise<InscriptionValidation[]> {
    return Promise.resolve(ValidationMock.validateData(args));
  }

  dialogStarts(pid: string): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  triggerStarts(pid: string): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  callSubStarts(pid: string): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  roles(pid: string): Promise<Role[]> {
    return Promise.resolve(MetaMock.ROLES);
  }

  expiryErrors(pid: string): Promise<ExpiryError[]> {
    return Promise.resolve(MetaMock.EXPIRY_ERRORS);
  }

  outMapping(pid: string): Promise<MappingInfo> {
    return Promise.resolve(MetaMock.OUT_MAP_INFO);
  }
}
