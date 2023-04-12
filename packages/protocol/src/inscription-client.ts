import { InscriptionDataBeta, InscriptionSaveData } from './data';
import { CallableStart, ExpiryError, MappingInfo, Role } from './meta';
import { InscriptionValidation } from './validation';

export interface Event<T> {
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface InscriptionClient {
  initialize(): Promise<boolean>;
  data(pid: string): Promise<InscriptionDataBeta>;
  saveData(args: InscriptionSaveData): Promise<InscriptionValidation[]>;

  dialogStarts(pid: string): Promise<CallableStart[]>;
  triggerStarts(pid: string): Promise<CallableStart[]>;
  callSubStarts(pid: string): Promise<CallableStart[]>;

  roles(pid: string): Promise<Role[]>;
  expiryErrors(pid: string): Promise<ExpiryError[]>;
  outMapping(pid: string): Promise<MappingInfo>;

  onDataChanged: Event<InscriptionDataBeta>;
  onValidation: Event<InscriptionValidation[]>;
}
