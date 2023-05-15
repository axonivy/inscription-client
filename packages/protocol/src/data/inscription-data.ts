import { CallData, DialogCallData, EndPageData, NameData, OutputData, ProcessCallData } from './part-data';
import { InscriptionType } from './inscription';
import { CaseData, TaskData } from './workflow-data';

export type ConfigData = CallData & DialogCallData & ProcessCallData & OutputData & TaskData & CaseData & EndPageData;

export type ElementData = NameData & { config: ConfigData };

export interface InscriptionData {
  pid: string;
  type: InscriptionType;
  readonly: boolean;
  data: ElementData;
  defaults: ConfigData;
}

export interface InscriptionSaveData {
  pid: string;
  type: ElementType;
  data: ElementData;
}

export type ElementType = InscriptionType['id'];
