import { NameData } from './part-data';
import {
  Data,
  InscriptionRequest,
  InscriptionSaveRequest,
  InscriptionType,
  MailHeaders,
  SchemaKey,
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

export type SchemaKeys = ValuesAsUnionDeep<SchemaKey> | keyof WfTask | keyof WfTask['expiry'] | keyof MailHeaders | keyof StartPermission;
export type SchemaPath = Brand<string, 'SchemaPath'>;
