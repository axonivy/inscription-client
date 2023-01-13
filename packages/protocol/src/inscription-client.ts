import { InscriptionData, InscriptionSaveData } from './data';
import { DialogStart, Role, Variable } from './meta';
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

  dialogStarts(): Promise<DialogStart[]>;
  roles(): Promise<Role[]>;
  outMapping(): Promise<Variable[]>;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
