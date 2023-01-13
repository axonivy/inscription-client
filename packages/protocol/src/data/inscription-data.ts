import { InscriptionEditorType, InscriptionType } from './inscription-type';

export interface InscriptionData {
  pid: string;
  type: InscriptionType;
  readonly: boolean;
  data: any;
}

export interface InscriptionSaveData {
  pid: string;
  type: InscriptionEditorType;
  data: any;
}
