import { CustomField } from './common';

export enum ResponsibleType {
  ROLE = 'Role',
  ROLE_FROM_ATTRIBUTE = 'Role from Attr.',
  USER_FROM_ATTRIBUTE = 'User from Attr.',
  DELETE_TASK = 'Nobody & delete'
}

export interface Responsible {
  type?: ResponsibleType;
  activator?: string;
}

export enum PriorityLevel {
  LOW = 'Low',
  NORMAL = 'Normal',
  HIGH = 'High',
  EXCEPTION = 'Exception',
  SCRIPT = 'Script'
}

export interface Priority {
  level?: PriorityLevel;
  script?: string;
}

export interface Expiry {
  timeout?: string;
  error?: string;
  responsible?: Responsible;
  priority?: Priority;
}

export interface Task {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  responsible?: Responsible;
  priority?: Priority;
  expiry?: Expiry;
  customFields?: CustomField[];
  code?: string;
  skipTasklist?: boolean;
  delay?: string;
}

export interface TaskData {
  config: {
    task?: Task;
    tasks?: Task[];
  };
}

export interface PersistTaskData {
  config: {
    persist?: boolean;
  };
}
