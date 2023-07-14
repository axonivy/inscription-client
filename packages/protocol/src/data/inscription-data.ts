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
import { InscriptionType, SchemaKey } from './inscription';
import { ValuesAsUnionDeep } from '../utils/type-helper';

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

type TaskCaseSchemaKeys = 'name' | 'description' | 'category' | 'expriy';

type EmailSchemaKeys = 'subject' | 'from' | 'to' | 'replyTo' | 'cc' | 'bcc';

export type SchemaKeys = ValuesAsUnionDeep<SchemaKey> | TaskCaseSchemaKeys | EmailSchemaKeys;
