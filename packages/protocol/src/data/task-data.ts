import { CustomField } from './common';

export const RESPONSIBLE_TYPE = {
  ROLE: 'Role',
  ROLE_FROM_ATTRIBUTE: 'Role from Attr.',
  USER_FROM_ATTRIBUTE: 'User from Attr.',
  DELETE_TASK: 'Nobody & delete'
} as const;

export type ResponsibleType = keyof typeof RESPONSIBLE_TYPE;

export interface Responsible {
  type: ResponsibleType;
  activator: string;
}

export const PRIORITY_LEVEL = {
  LOW: 'Low',
  NORMAL: 'Normal',
  HIGH: 'High',
  EXCEPTION: 'Exception',
  SCRIPT: 'Script'
} as const;

export type PriorityLevel = keyof typeof PRIORITY_LEVEL;

export interface Priority {
  level: PriorityLevel;
  script: string;
}

export interface Expiry {
  timeout: string;
  error: string;
  responsible: Responsible;
  priority: Priority;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  category: string;
  responsible: Responsible;
  priority: Priority;
  expiry: Expiry;
  customFields: CustomField[];
  code: string;
  skipTasklist: boolean;
  delay: string;
}

export interface TaskData {
  task: Task;
  tasks: Task[];
  persist: boolean;
}

const DEFAULT_RESPONSIBLE: Responsible = {
  type: 'ROLE',
  activator: 'Everybody'
} as const;

const DEFAULT_PRIORITY: Priority = {
  level: 'NORMAL',
  script: ''
} as const;

export const DEFAULT_TASK: Task = {
  id: '',
  name: '',
  description: '',
  category: '',
  responsible: DEFAULT_RESPONSIBLE,
  priority: DEFAULT_PRIORITY,
  skipTasklist: false,
  delay: '',
  expiry: {
    timeout: '',
    error: '',
    responsible: DEFAULT_RESPONSIBLE,
    priority: DEFAULT_PRIORITY
  },
  customFields: [] as CustomField[],
  code: ''
} as const;

export const DEFAULT_TASK_DATA: TaskData = {
  task: DEFAULT_TASK,
  tasks: [] as Task[],
  persist: false
} as const;
