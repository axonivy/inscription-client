import { QueryKind, WfActivatorType, WfFieldType, WfLevel } from './inscription';

export const RESPONSIBLE_TYPE = {
  ROLE: 'Role',
  ROLE_FROM_ATTRIBUTE: 'Role from Attr.',
  USER_FROM_ATTRIBUTE: 'User from Attr.',
  DELETE_TASK: 'Nobody & delete'
} as const satisfies Record<WfActivatorType, string>;

export const PRIORITY_LEVEL = {
  LOW: 'Low',
  NORMAL: 'Normal',
  HIGH: 'High',
  EXCEPTION: 'Exception',
  SCRIPT: 'Script'
} as const satisfies Record<WfLevel, string>;

export const CUSTOM_FIELD_TYPE = {
  STRING: 'String',
  TEXT: 'Text',
  NUMBER: 'Number',
  TIMESTAMP: 'Timestamp'
} as const satisfies Record<WfFieldType, string>;

export const MAIL_TYPE = {
  plain: 'text/plain',
  html: 'text/html'
} as const;

export const IVY_EXCEPTIONS = {
  mail: 'ivy:error:email',
  security: 'ivy:security:forbidden',
  database: 'ivy:error:database'
} as const;

export const QUERY_KIND = {
  READ: 'READ',
  WRITE: 'WRITE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  ANY: 'ANY'
} as const satisfies Record<QueryKind, QueryKind>;

export const QUERY_ORDER = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING'
} as const;

export const IVY_SCRIPT_TYPES = {
  ...CUSTOM_FIELD_TYPE,
  DURATION: 'Duration',
  BOOLEAN: 'Boolean',
  INT: 'Integer',
  BPM_ERROR: 'ch.ivyteam.ivy.bpm.error.BpmError'
} as const;
