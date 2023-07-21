import {
  CallData,
  CaseData,
  ConditionData,
  DialogCallData,
  EndPageData,
  ErrorCatchData,
  MailData,
  NameData,
  OutputData,
  ProcessCallData,
  ResultData,
  SignalCatchData,
  StartData,
  TaskData
} from './part-data';
import { InscriptionContext, InscriptionType, MailHeaders, SchemaKey, WfTask } from './inscription';
import { Brand, ValuesAsUnionDeep } from '../utils/type-helper';

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
  MailData;

export type ElementData = NameData & { config: ConfigData };

export interface InscriptionData {
  context: InscriptionContext;
  type: InscriptionType;
  readonly: boolean;
  data: ElementData;
  defaults: ConfigData;
}

export interface InscriptionSaveData {
  context: InscriptionContext;
  data: ElementData;
}

export type ElementType = InscriptionType['id'];

type TaskSchemaKeys = keyof WfTask | keyof WfTask['expiry'];
type EmailSchemaKeys = keyof MailHeaders;
export type SchemaKeys = ValuesAsUnionDeep<SchemaKey> | TaskSchemaKeys | EmailSchemaKeys;
export type SchemaPath = Brand<string, 'SchemaPath'>;
