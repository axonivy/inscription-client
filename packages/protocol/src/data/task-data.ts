export enum ResponsibleType {
  ROLE = 'Role',
  ROLE_FROM_ATTRIBUTE = 'Role from Attr.',
  USER_FROM_ATTRIBUTE = 'User from Attr.',
  DELETE_TASK = 'Nobody & delete'
}

export interface Responsible {
  type: ResponsibleType;
  activator: string;
}

export enum PriorityLevel {
  LOW = 'Low',
  NORMAL = 'Normal',
  HIGH = 'High',
  EXCEPTION = 'Exception',
  SCRIPT = 'Script'
}

export interface Priority {
  level: PriorityLevel;
  script: string;
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
  responsible: Responsible;
  priority: Priority;

  'expiry/timeout': string;
  'expiry/error': string;
  'expiry/responsible': Responsible;
  'expiry/priority': Priority;

  customFields: CustomField[];
  code: string;

  skipTasklist: boolean;
  delay: string;
}

export interface PersistTaskDataAccess {
  'config/persist': boolean;
}
