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
  RequestData,
  ResultData,
  SignalCatchData,
  StartData,
  TaskData,
  TriggerData
} from './part-data';
import { InscriptionContext, InscriptionType, MailHeaders, SchemaKey, StartPermission, WfTask } from './inscription';
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
  MailData &
  TriggerData &
  RequestData;

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
type StartPermissionSchemaKeys = keyof StartPermission;
export type SchemaKeys = ValuesAsUnionDeep<SchemaKey> | TaskSchemaKeys | EmailSchemaKeys | StartPermissionSchemaKeys;
export type SchemaPath = Brand<string, 'SchemaPath'>;
