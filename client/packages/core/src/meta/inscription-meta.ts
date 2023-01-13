export interface DialogStart {
  id: string;
  dialog: string;
  dialogName: string;
  startName: string;
  description: string;
  packageName: string;
  project: string;
  callParameter: Variable[];
}

export interface Role {
  id: string;
  label: string;
}

export interface Variable {
  attribute: string;
  type: string;
  simpleType: string;
  children: Variable[];
}

export const USER_DIALOG_META_CALL: Variable[] = [
  {
    attribute: 'param',
    type: '<workflow.humantask.ProcurementRequest procurementRequest>',
    simpleType: '<ProcurementRequest>',
    children: [
      {
        attribute: 'procurementRequest',
        type: 'workflow.humantask.ProcurementRequest',
        simpleType: 'ProcurementRequest',
        children: [
          { attribute: 'accepted', type: 'java.lang.Boolean', simpleType: 'Boolean', children: [] },
          { attribute: 'amount', type: 'java.lang.Number', simpleType: 'Number', children: [] }
        ]
      }
    ]
  }
];

export const DIALOG_STARTS_META: DialogStart[] = [
  {
    id: 'workflow.humantask.AcceptRequest:start()',
    dialog: 'workflow.humantask.AcceptRequest:start()',
    dialogName: 'AcceptRequest',
    startName: 'start():ProcurementRequest,LogEntry',
    description: '',
    packageName: 'workflow.humantask',
    project: 'workflow-demos',
    callParameter: USER_DIALOG_META_CALL
  },
  {
    id: 'workflow.humantask.AcceptRequest:start2()',
    dialog: 'workflow.humantask.AcceptRequest:start2()',
    dialogName: 'AcceptRequest',
    startName: 'start2()',
    description: '',
    packageName: 'workflow.humantask',
    project: 'workflow-demos',
    callParameter: []
  },
  {
    id: 'demo.test1:start()',
    dialog: 'demo.test1:start()',
    dialogName: 'test1',
    startName: 'start()',
    description: '',
    packageName: 'demo',
    project: 'demo',
    callParameter: []
  }
];

export const ROLES_META: Role[] = [
  { id: 'Everybody', label: 'In this role is everyone' },
  { id: 'Employee', label: '' },
  { id: 'Teamleader', label: '' }
];
