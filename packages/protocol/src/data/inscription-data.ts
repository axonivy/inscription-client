import {
  CallData,
  CaseData,
  ConditionData,
  DialogCallData,
  EndPageData,
  ErrorCatchData,
  MailHeaderData,
  NameData,
  OutputData,
  ProcessCallData,
  ResultData,
  SignalCatchData,
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
  StartData &
  ResultData &
  ErrorCatchData &
  SignalCatchData &
  MailHeaderData;

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
