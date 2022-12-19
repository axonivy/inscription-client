export interface DialogStart {
  id: string;
  dialogName: string;
  startName: string;
  description: string;
  package: string;
  project: string;
  callParameter: Variable[];
}

export interface Variable {
  attribute: string;
  type: string;
  children: Variable[];
}

export const USER_DIALOG_META_CALL: Variable[] = [
  {
    attribute: 'param',
    type: '<ProcurementRequest>',
    children: [
      {
        attribute: 'procurementRequest',
        type: 'ProcurementRequest',
        children: [
          { attribute: 'accepted', type: 'Boolean', children: [] },
          { attribute: 'amount', type: 'Number', children: [] }
        ]
      }
    ]
  }
];

export const DIALOG_STARTS_META: DialogStart[] = [
  {
    id: 'workflow.humantask.AcceptRequest:start()',
    dialogName: 'AcceptRequest',
    startName: 'start():ProcurementRequest,LogEntry',
    description: '',
    package: 'workflow.humantask',
    project: 'workflow-demos',
    callParameter: USER_DIALOG_META_CALL
  },
  {
    id: 'workflow.humantask.AcceptRequest:start2()',
    dialogName: 'AcceptRequest',
    startName: 'start2()',
    description: '',
    package: 'workflow.humantask',
    project: 'workflow-demos',
    callParameter: []
  },
  {
    id: 'demo.test1:start()',
    dialogName: 'test1',
    startName: 'start()',
    description: '',
    package: 'demo',
    project: 'demo',
    callParameter: []
  }
];
