import { WfActivatorType, WfFieldType, WfLevel } from './inscription';

export const RESPONSIBLE_TYPE: Record<WfActivatorType, string> = {
  ROLE: 'Role',
  ROLE_FROM_ATTRIBUTE: 'Role from Attr.',
  USER_FROM_ATTRIBUTE: 'User from Attr.',
  DELETE_TASK: 'Nobody & delete'
} as const;

export const PRIORITY_LEVEL: Record<WfLevel, string> = {
  LOW: 'Low',
  NORMAL: 'Normal',
  HIGH: 'High',
  EXCEPTION: 'Exception',
  SCRIPT: 'Script'
} as const;

export const CUSTOM_FIELD_TYPE: Record<WfFieldType, string> = {
  STRING: 'String',
  TEXT: 'Text',
  NUMBER: 'Number',
  TIMESTAMP: 'Timestamp'
} as const;

export const MAIL_TYPE = {
  plain: 'text/plain',
  html: 'text/html'
} as const;

export const IVY_EXCEPTIONS = {
  mail: 'ivy:error:email',
  security: 'ivy:security:forbidden'
} as const;

export const IVY_SCRIPT_TYPES = {
  ...CUSTOM_FIELD_TYPE,
  DURATION: 'Duration',
  BOOLEAN: 'Boolean',
  INT: 'Integer'
} as const;
