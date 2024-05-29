import type { InscriptionActionArgs, InscriptionData, InscriptionElementContext, InscriptionSaveData, ValidationResult } from './data';
import type { InscriptionMetaRequestTypes } from './inscription-protocol';

export interface Event<T> {
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface InscriptionClient {
  initialize(): Promise<boolean>;
  data(context: InscriptionElementContext): Promise<InscriptionData>;
  saveData(saveData: InscriptionSaveData): Promise<ValidationResult[]>;

  validate(context: InscriptionElementContext): Promise<ValidationResult[]>;

  meta<TMeta extends keyof InscriptionMetaRequestTypes>(
    path: TMeta,
    args: InscriptionMetaRequestTypes[TMeta][0]
  ): Promise<InscriptionMetaRequestTypes[TMeta][1]>;

  action(action: InscriptionActionArgs): void;

  onDataChanged: Event<void>;
  onValidation: Event<ValidationResult[]>;
}
