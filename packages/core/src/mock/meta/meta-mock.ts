import { DialogStart, ExpiryError, Role, Variable } from '@axonivy/inscription-protocol';

export namespace MetaMock {
  const USER_DIALOG_MAPPING: Variable[] = [
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

  export const DIALOG_STARTS: DialogStart[] = [
    {
      id: 'workflow.humantask.AcceptRequest:start()',
      dialog: 'workflow.humantask.AcceptRequest:start()',
      dialogName: 'AcceptRequest',
      startName: 'start():ProcurementRequest,LogEntry',
      description: '',
      packageName: 'workflow.humantask',
      project: 'workflow-demos',
      callParameter: USER_DIALOG_MAPPING
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

  export const ROLES: Role[] = [
    { id: 'Everybody', label: 'In this role is everyone' },
    { id: 'Employee', label: '' },
    { id: 'Teamleader', label: '' }
  ];

  export const EXPIRY_ERRORS: ExpiryError[] = [
    { label: 'ProcurementRequestParallel -> error:task', id: 'f29' },
    { label: 'ProcurementRequestParallel -> error:task:bla', id: 'f31' }
  ];
}
