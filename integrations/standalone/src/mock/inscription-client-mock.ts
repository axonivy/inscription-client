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
  InscriptionActionArgs,
  EventCodeMeta,
  InscriptionContext
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

  data(context: InscriptionContext): Promise<InscriptionData> {
    const inscriptionType: InscriptionType = {
      id: this.type,
      label: this.type,
      shortLabel: this.type,
      description: this.type,
      iconId: this.type
    };
    this.elementData = DataMock.mockForType(this.type) as ElementData;
    this.onValidationEmitter.fire(ValidationMock.validateData(this.type, { data: this.elementData, context }));
    return Promise.resolve({
      context,
      type: inscriptionType,
      readonly: this.readonly,
      data: deepmerge(DEFAULT_DATA, this.elementData),
      defaults: DEFAULT_DATA.config
    });
  }

  saveData(saveData: InscriptionSaveData): Promise<InscriptionValidation[]> {
    return Promise.resolve(ValidationMock.validateData(this.type, saveData));
  }

  validate(context: InscriptionContext): Promise<InscriptionValidation[]> {
    return Promise.resolve(ValidationMock.validateData(this.type, { context, data: this.elementData }));
  }

  dialogStarts(context: InscriptionContext): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  triggerStarts(context: InscriptionContext): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  callSubStarts(context: InscriptionContext): Promise<CallableStart[]> {
    return Promise.resolve(MetaMock.CALLABLE_STARTS);
  }

  roles(context: InscriptionContext): Promise<RoleMeta[]> {
    return Promise.resolve(MetaMock.ROLES);
  }

  expiryErrors(context: InscriptionContext): Promise<ErrorMeta[]> {
    return Promise.resolve(MetaMock.EXPIRY_ERRORS);
  }

  errorCodes(context: InscriptionContext): Promise<EventCodeMeta[]> {
    return Promise.resolve([]);
  }

  signalCodes(context: InscriptionContext): Promise<EventCodeMeta[]> {
    return Promise.resolve([]);
  }

  outScripting(context: InscriptionContext, location: string): Promise<VariableInfo> {
    if (location === 'result') {
      return Promise.resolve(JSON.parse(JSON.stringify(MetaMock.RESULT_VAR_INFO)));
    }
    return Promise.resolve(MetaMock.OUT_VAR_INFO);
  }

  inScripting(context: InscriptionContext, location: string): Promise<VariableInfo> {
    return Promise.resolve(MetaMock.IN_VAR_INFO);
  }

  connectorOf(context: InscriptionContext): Promise<ConnectorRef> {
    if (context.pid.includes('f1')) {
      return Promise.resolve(MetaMock.CONNECTOR_OF);
    }
    //@ts-ignore
    return Promise.resolve(undefined);
  }

  action(action: InscriptionActionArgs): void {
    alert(`action: [actionId: ${action.actionId}, context: ${action.context}, payload: ${action.payload}]`);
  }
}
