import { WfActivator, WfPriority, WfTask, WfCustomField, TaskData, CaseData } from '../data';

const DEFAULT_RESPONSIBLE: WfActivator = {
  type: 'ROLE',
  activator: 'Everybody'
} as const;

const DEFAULT_PRIORITY: WfPriority = {
  level: 'NORMAL',
  script: ''
} as const;

export const DEFAULT_TASK: WfTask = {
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
  customFields: [] as WfCustomField[],
  code: ''
} as const;

export const DEFAULT_TASK_DATA: TaskData = {
  task: DEFAULT_TASK,
  tasks: [] as WfTask[],
  persist: false
} as const;

export const DEFAULT_CASE_DATA: CaseData = {
  case: {
    name: '',
    description: '',
    category: '',
    customFields: [] as WfCustomField[],
    attachToBusinessCase: false
  }
} as const;