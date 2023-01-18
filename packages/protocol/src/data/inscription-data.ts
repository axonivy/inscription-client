import { CallData } from './call-data';
import { CaseData } from './case-data';
import { InscriptionEditorType, InscriptionType } from './inscription-type';
import { NameData } from './name-data';
import { OutputData } from './output-data';
import { PersistTaskData, TaskData } from './task-data';

export type Data = NameData & CallData & OutputData & TaskData & PersistTaskData & CaseData;

export interface InscriptionData {
  pid: string;
  type: InscriptionType;
  readonly: boolean;
  data: Data;
}

export interface InscriptionSaveData {
  pid: string;
  type: InscriptionEditorType;
  data: Data;
}
