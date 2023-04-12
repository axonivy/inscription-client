import { CallData, DEFAULT_CALL_DATA, DialogCallData, ProcessCallData } from './call-data';
import { CaseData, DEFAULT_CASE_DATA } from './case-data';
import { DEFAULT_END_PAGE_DATA, EndPageData } from './end-page-data';
import { InscriptionEditorType, InscriptionTypeBeta } from './inscription-type';
import { NameData, DEFAULT_NAME_DATA } from './name-data';
import { DEFAULT_OUTPUT_DATA } from './output-data';
import { ElementScript } from './inscription';
import { DEFAULT_TASK_DATA, TaskData } from './task-data';

export type ConfigData = CallData & DialogCallData & ProcessCallData & ElementScript & TaskData & CaseData & EndPageData;

export type DataBeta = NameData & { config: ConfigData };

export interface InscriptionDataBeta {
  pid: string;
  type: InscriptionTypeBeta;
  readonly: boolean;
  data: DataBeta;
  defaults: ConfigData;
}

export interface InscriptionSaveData {
  pid: string;
  type: InscriptionEditorType;
  data: DataBeta;
}

export const DEFAULT_DATA: DataBeta = {
  ...DEFAULT_NAME_DATA,
  config: {
    ...DEFAULT_CALL_DATA,
    ...DEFAULT_OUTPUT_DATA,
    ...DEFAULT_TASK_DATA,
    ...DEFAULT_CASE_DATA,
    ...DEFAULT_END_PAGE_DATA
  }
} as const;
