import { WfActivator, WfPriority, WfTask, WfCustomField, TaskData, CaseData, WfNotification } from '../data';

const DEFAULT_RESPONSIBLE: WfActivator = {
  type: 'ROLE',
  activator: 'Everybody'
} as const;

const DEFAULT_PRIORITY: WfPriority = {
  level: 'NORMAL',
  script: ''
} as const;

const DEFAULT_WFNOTIFICATION: WfNotification = {
  suppress: false
} as const;

export const DEFAULT_TASK: WfTask = {
  id: '',
  name: '',
  description: '',
  category: '',
  responsible: DEFAULT_RESPONSIBLE,
  priority: DEFAULT_PRIORITY,
  skipTasklist: false,
  notification: {suppress: false},
  delay: '',
  notification: DEFAULT_WFNOTIFICATION,
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
  persistOnStart: false
} as const;

export const DEFAULT_CASE_DATA: CaseData = {
  case: {
    name: '',
    description: '',
    category: '',
    customFields: [] as WfCustomField[],
    attachToBusinessCase: true
  }
} as const;
