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

export interface TaskDataAccess {
  'config/task/name': string;
  'config/task/description': string;
  'config/task/category': string;
  'config/task/priority': string;

  'config/task/expiry/timeout': string;
  'config/task/expiry/error': string;
  'config/task/expiry/responsible/type': ResponsibleType;
  'config/task/expiry/responsible/activator': string;
  'config/task/expiry/priority': string;

  'config/task/customFields': CustomField[];
  'config/task/code': string;

  'config/task/skipTasklist': boolean;
  'config/task/delay': string;
  'config/persist': boolean;
}
