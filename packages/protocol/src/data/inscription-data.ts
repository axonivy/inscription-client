import { CallData, DEFAULT_CALL_DATA, DialogCallData, ProcessCallData } from './call-data';
import { CaseData, DEFAULT_CASE_DATA } from './case-data';
import { DEFAULT_END_PAGE_DATA, EndPageData } from './end-page-data';
import { InscriptionEditorType, InscriptionType } from './inscription-type';
import { NameData, DEFAULT_NAME_DATA } from './name-data';
import { DEFAULT_OUTPUT_DATA, OutputData } from './output-data';
import { DEFAULT_TASK_DATA, TaskData } from './task-data';

export type ConfigData = CallData & DialogCallData & ProcessCallData & OutputData & TaskData & CaseData & EndPageData;

export type Data = NameData & { config: ConfigData };

export interface InscriptionData {
  pid: string;
  type: InscriptionType;
  readonly: boolean;
  data: Data;
  defaults: ConfigData;
}

export interface InscriptionSaveData {
  pid: string;
  type: InscriptionEditorType;
  data: Data;
}

export const DEFAULT_DATA: Data = {
  ...DEFAULT_NAME_DATA,
  config: {
    ...DEFAULT_CALL_DATA,
    ...DEFAULT_OUTPUT_DATA,
    ...DEFAULT_TASK_DATA,
    ...DEFAULT_CASE_DATA,
    ...DEFAULT_END_PAGE_DATA
  }
} as const;
