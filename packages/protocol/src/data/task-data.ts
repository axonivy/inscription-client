export enum ResponsibleType {
  ROLE = 'Role',
  ROLE_FROM_ATTRIBUTE = 'Role from Attr.',
  USER_FROM_ATTRIBUTE = 'User from Attr.',
  DELETE_TASK = 'Nobody & delete'
}

export enum CustomFieldType {
  STRING = 'String',
  TEXT = 'Text',
  NUMBER = 'Number',
  TIMESTAMP = 'Timestamp'
}

export interface CustomField {
  name: string;
  type: CustomFieldType;
  value: string;
}

export namespace TaskDataAccess {
  export const SINGLE_PREFIX = 'config/task';
  export const MULTI_PREFIX = 'config/tasks';
}

export interface TaskDataAccess {
  name: string;
  description: string;
  category: string;
  priority: string;
  'responsible/type': ResponsibleType;
  'responsible/activator': string;

  'expiry/timeout': string;
  'expiry/error': string;
  'expiry/responsible/type': ResponsibleType;
  'expiry/responsible/activator': string;
  'expiry/priority': string;

  customFields: CustomField[];
  code: string;

  skipTasklist: boolean;
  delay: string;
  'config/persist': boolean;
}
