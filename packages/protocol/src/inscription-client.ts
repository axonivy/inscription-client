import { InscriptionData, InscriptionSaveData } from './data';
import { DialogStart, ExpiryError, MappingInfo, Role } from './meta';
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

  dialogStarts(pid: string): Promise<DialogStart[]>;
  roles(pid: string): Promise<Role[]>;
  expiryErrors(pid: string): Promise<ExpiryError[]>;
  outMapping(pid: string): Promise<MappingInfo>;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
