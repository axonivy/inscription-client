import { NameData } from './part-data';
import {
  Cache,
  CacheArtifact,
  Data,
  DbQuery,
  DbSqlStatement,
  ErrorDefinition,
  InscriptionRequest,
  InscriptionSaveRequest,
  InscriptionType,
  MailHeaders,
  SchemaKey,
  SoapWsProcessException,
  StartPermission,
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
  | keyof SoapWsProcessException;
export type SchemaPath = Brand<string, 'SchemaPath'>;
