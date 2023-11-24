import type { InscriptionActionArgs, InscriptionData, InscriptionElementContext, InscriptionSaveData, InscriptionValidation } from './data/index.js';
import type { InscriptionMetaRequestTypes } from './inscription-protocol.js';

export interface Event<T> {
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface InscriptionClient {
  initialize(): Promise<boolean>;
  data(context: InscriptionElementContext): Promise<InscriptionData>;
  saveData(saveData: InscriptionSaveData): Promise<InscriptionValidation[]>;

  validate(context: InscriptionElementContext): Promise<InscriptionValidation[]>;

  meta<TMeta extends keyof InscriptionMetaRequestTypes>(
    path: TMeta,
    args: InscriptionMetaRequestTypes[TMeta][0]
  ): Promise<InscriptionMetaRequestTypes[TMeta][1]>;

  action(action: InscriptionActionArgs): void;

  onDataChanged: Event<InscriptionData>;
  onValidation: Event<InscriptionValidation[]>;
}
