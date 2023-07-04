import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  EventCodeMeta,
  InscriptionAction,
  InscriptionData,
  InscriptionSaveData,
  InscriptionValidation,
  PID,
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
  data(pid: PID): Promise<InscriptionData>;
  saveData(args: InscriptionSaveData): Promise<InscriptionValidation[]>;

  dialogStarts(pid: PID): Promise<CallableStart[]>;
  triggerStarts(pid: PID): Promise<CallableStart[]>;
  callSubStarts(pid: PID): Promise<CallableStart[]>;

  roles(pid: PID): Promise<RoleMeta[]>;
  expiryErrors(pid: PID): Promise<ErrorMeta[]>;
  errorCodes(pid: PID): Promise<EventCodeMeta[]>;
  signalCodes(pid: PID): Promise<EventCodeMeta[]>;

  outScripting(pid: PID, location: string): Promise<VariableInfo>;
  inScripting(pid: PID, location: string): Promise<VariableInfo>;

  connectorOf(pid: PID): Promise<ConnectorRef>;

  action(action: InscriptionAction): void;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
