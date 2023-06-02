import {
  CallableStart,
  ConnectorRef,
  ErrorMeta,
  InscriptionAction,
  InscriptionData,
  InscriptionSaveData,
  InscriptionValidation,
  MappingInfo,
  PID,
  RoleMeta
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
  outMapping(pid: PID): Promise<MappingInfo>;
  resultMapping(pid: PID): Promise<MappingInfo>;

  connectorOf(pid: PID): Promise<ConnectorRef>;

  action(action: InscriptionAction): void;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
