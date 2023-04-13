import { CallData, DialogCallData, EndPageData, NameData, ProcessCallData } from './tab-data';
import { ElementScript, InscriptionType } from './inscription';
import { ElementType } from './inscription-type';
import { CaseData, TaskData } from './workflow-data';

export type ConfigData = CallData & DialogCallData & ProcessCallData & ElementScript & TaskData & CaseData & EndPageData;

export type DataBeta = NameData & { config: ConfigData };

export interface InscriptionData {
  pid: string;
  type: InscriptionType;
  readonly: boolean;
  data: DataBeta;
  defaults: ConfigData;
}

export interface InscriptionSaveData {
  pid: string;
  type: ElementType;
  data: DataBeta;
}
