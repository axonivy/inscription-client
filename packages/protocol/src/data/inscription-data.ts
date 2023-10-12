import { NameData } from './part-data';
import {
  Cache,
  CacheArtifact,
  Data,
  DbQuery,
  DbSqlStatement,
  ElementProgramInterface,
  ElementWaitEvent,
  ErrorDefinition,
  InscriptionRequest,
  InscriptionSaveRequest,
  InscriptionType,
  JavaEventTimeout,
  JavaTimeout,
  MailHeaders,
  ProcessConfig,
  RestBody,
  RestPayloadMapping,
  RestResponse,
  RestTarget,
  SchemaKey,
  SoapOperation,
  SoapWsProcessException,
  StartPermission,
  WebserviceProcessConfig,
  WfTask
} from './inscription';
import { Brand, UnionToIntersection, ValuesAsUnionDeep } from '../utils/type-helper';

export type ConfigData = UnionToIntersection<Data['config']>;

export type ElementData = NameData & { config: ConfigData };

export type InscriptionData = Omit<InscriptionRequest, 'data' | 'defaults'> & {
  data: ElementData;
  defaults: ConfigData;
};

export type InscriptionSaveData = Omit<InscriptionSaveRequest, 'data'> & { data: ElementData };

export type ElementType = InscriptionType['id'];

export type SchemaKeys =
  | ValuesAsUnionDeep<SchemaKey>
  | keyof WfTask
  | keyof WfTask['expiry']
  | keyof MailHeaders
  | keyof StartPermission
  | keyof ErrorDefinition
  | keyof DbQuery
  | keyof DbSqlStatement
  | keyof Cache
  | keyof CacheArtifact
  | keyof SoapWsProcessException
  | keyof SoapOperation
  | keyof ProcessConfig
  | keyof WebserviceProcessConfig
  | keyof RestResponse
  | keyof RestPayloadMapping
  | keyof RestTarget
  | keyof RestBody
  | keyof JavaTimeout
  | keyof ElementProgramInterface
  | keyof ElementWaitEvent
  | keyof JavaEventTimeout;
export type SchemaPath = Brand<string, 'SchemaPath'>;
