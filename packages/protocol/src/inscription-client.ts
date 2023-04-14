import { CallableStart, ErrorMeta, InscriptionData, InscriptionSaveData, MappingInfo, RoleMeta } from './data';
import { InscriptionValidation } from './validation';

export interface Event<T> {
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface InscriptionClient {
  initialize(): Promise<boolean>;
  data(pid: string): Promise<InscriptionData>;
  saveData(args: InscriptionSaveData): Promise<InscriptionValidation[]>;

  dialogStarts(pid: string): Promise<CallableStart[]>;
  triggerStarts(pid: string): Promise<CallableStart[]>;
  callSubStarts(pid: string): Promise<CallableStart[]>;

  roles(pid: string): Promise<RoleMeta[]>;
  expiryErrors(pid: string): Promise<ErrorMeta[]>;
  outMapping(pid: string): Promise<MappingInfo>;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
