import {
  CallData,
  CaseData,
  ConditionData,
  DialogCallData,
  EndPageData,
  NameData,
  OutputData,
  ProcessCallData,
  StartData,
  TaskData
} from './part-data';
import { InscriptionType } from './inscription';

export type ConfigData = CallData &
  DialogCallData &
  ProcessCallData &
  OutputData &
  TaskData &
  CaseData &
  EndPageData &
  ConditionData &
  StartData;

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
