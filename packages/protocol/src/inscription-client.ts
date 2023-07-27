import { InscriptionActionArgs, InscriptionContext, InscriptionData, InscriptionSaveData, InscriptionValidation } from './data';
import { InscriptionMetaRequestTypes } from './inscription-protocol';

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

  meta<TMeta extends keyof InscriptionMetaRequestTypes>(
    path: TMeta,
    args: InscriptionMetaRequestTypes[TMeta][0]
  ): Promise<InscriptionMetaRequestTypes[TMeta][1]>;

  action(action: InscriptionActionArgs): void;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
