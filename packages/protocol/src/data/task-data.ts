export enum Responsible {
  ROLE = 'Role',
  ROLE_ATTR = 'Role form Attr.',
  USER_ATTR = 'User form Attr.',
  NOBODY = 'Nobody & delete'
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
  'config/persist': boolean;
  'config/task/name': string;
  'config/task/description': string;
  'config/task/category': string;
  'config/task/priority': string;
  'config/task/expiry/timeout': string;
  'config/task/expiry/error': string;
  'config/task/expiry/responsible/role': string;
  'config/task/expiry/priority': string;
  'config/task/customFields': CustomField[];
  'config/task/code': string;
}
