import { InscriptionData } from './data/inscription-data';
import { DialogStart, Variable } from './meta/inscription-meta';
import { InscriptionValidation } from './validation/inscription-validation';

export declare module InscriptionProtocol {
  export type InitializeArgs = void;
  export type InitializeRes = boolean;

  export type InscriptionDataArgs = { pid: string };
  export type InscriptionDataRes = InscriptionData;

  export type DialogStartsArgs = {}; //maybe later with param to filter offline dialogs
  export type DialogStartsRes = DialogStart[];

  export type OutMappingArgs = {};
  export type OutMappingRes = Variable[];
}

export interface InscriptionRequestTypes {
  initialize: [InscriptionProtocol.InitializeArgs, InscriptionProtocol.InitializeRes];
  data: [InscriptionProtocol.InscriptionDataArgs, InscriptionProtocol.InscriptionDataRes];

  dialogStarts: [InscriptionProtocol.DialogStartsArgs, InscriptionProtocol.DialogStartsRes];
  outMapping: [InscriptionProtocol.OutMappingArgs, InscriptionProtocol.OutMappingRes];
}

export interface InscriptionNotificationTypes {
  dataChanged: InscriptionData;
  validation: InscriptionValidation[];
}
