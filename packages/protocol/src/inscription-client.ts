import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  EventCodeMeta,
  InscriptionActionArgs,
  InscriptionContext,
  InscriptionData,
  InscriptionSaveData,
  InscriptionValidation,
  RoleMeta,
  VariableInfo
} from './data';

export interface Event<T> {
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface InscriptionClient {
  initialize(): Promise<boolean>;
  data(context: InscriptionContext): Promise<InscriptionData>;
  saveData(saveData: InscriptionSaveData): Promise<InscriptionValidation[]>;

  validate(context: InscriptionContext): Promise<InscriptionValidation[]>;

  dialogStarts(context: InscriptionContext): Promise<CallableStart[]>;
  triggerStarts(context: InscriptionContext): Promise<CallableStart[]>;
  callSubStarts(context: InscriptionContext): Promise<CallableStart[]>;

  roles(context: InscriptionContext): Promise<RoleMeta[]>;
  expiryErrors(context: InscriptionContext): Promise<ErrorMeta[]>;
  errorCodes(context: InscriptionContext): Promise<EventCodeMeta[]>;
  signalCodes(context: InscriptionContext): Promise<EventCodeMeta[]>;

  outScripting(context: InscriptionContext, location: string): Promise<VariableInfo>;
  inScripting(context: InscriptionContext, location: string): Promise<VariableInfo>;

  connectorOf(context: InscriptionContext): Promise<ConnectorRef>;

  action(action: InscriptionActionArgs): void;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
