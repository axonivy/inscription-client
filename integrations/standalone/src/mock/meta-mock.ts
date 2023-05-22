import { CallableStart, ConnectorRef, ErrorMeta, MappingInfo, NodeRef, RoleMeta } from '@axonivy/inscription-protocol';

export namespace MetaMock {
  const MAP_INFO_TYPES = {
    'workflow.humantask.ProcurementRequest': [
      {
        attribute: 'accepted',
        type: 'Boolean',
        simpleType: 'Boolean'
      },
      {
        attribute: 'activityLog',
        type: 'List<workflow.humantask.LogEntry>',
        simpleType: 'List<LogEntry>'
      },
      {
        attribute: 'amount',
        type: 'Number',
        simpleType: 'Number'
      },
      {
        attribute: 'dataOkManager',
        type: 'Boolean',
        simpleType: 'Boolean'
      },
      {
        attribute: 'dataOkTeamLeader',
        type: 'Boolean',
        simpleType: 'Boolean'
      },
      {
        attribute: 'description',
        type: 'String',
        simpleType: 'String'
      },
      {
        attribute: 'notes',
        type: 'String',
        simpleType: 'String'
      },
      {
        attribute: 'pricePerUnit',
        type: 'Number',
        simpleType: 'Number'
      },
      {
        attribute: 'requester',
        type: 'workflow.humantask.User',
        simpleType: 'User'
      },
      {
        attribute: 'totalPrice',
        type: 'Number',
        simpleType: 'Number'
      }
    ],
    'workflow.humantask.User': [
      {
        attribute: 'email',
        type: 'String',
        simpleType: 'String'
      },
      {
        attribute: 'fullName',
        type: 'String',
        simpleType: 'String'
      },
      {
        attribute: 'role',
        type: 'String',
        simpleType: 'String'
      }
    ]
  };

  export const OUT_MAP_INFO: MappingInfo = {
    variables: [
      {
        attribute: 'out',
        type: 'workflow.humantask.ProcurementRequest',
        simpleType: 'ProcurementRequest'
      }
    ],
    types: MAP_INFO_TYPES
  };

  export const CALLABLE_STARTS: CallableStart[] = [
    {
      id: 'workflow.humantask.AcceptRequest:start(workflow.humantask.ProcurementRequest)',
      process: 'AcceptRequest',
      packageName: 'workflow.humantask',
      description: '',
      startName: 'start(workflow.humantask.ProcurementRequest)',
      project: 'workflow-demos',
      callParameter: {
        variables: [
          {
            attribute: 'param.procurementRequest',
            type: 'workflow.humantask.ProcurementRequest',
            simpleType: 'ProcurementRequest'
          }
        ],
        types: MAP_INFO_TYPES
      }
    },
    {
      id: 'workflow.humantask.AcceptRequest:start2()',
      process: 'AcceptRequest',
      startName: 'start2()',
      description: '',
      packageName: 'workflow.humantask',
      project: 'workflow-demos',
      callParameter: {
        variables: [],
        types: {}
      }
    },
    {
      id: 'demo.test1:start()',
      process: 'test1',
      startName: 'start()',
      description: '',
      packageName: 'demo',
      project: 'demo',
      callParameter: {
        variables: [
          {
            attribute: 'param.Endless',
            type: 'demo.Endless',
            simpleType: 'Endless'
          }
        ],
        types: {
          'demo.Endless': [
            {
              attribute: 'endless',
              type: 'demo.Endless',
              simpleType: 'Endless'
            }
          ]
        }
      }
    }
  ];

  export const ROLES: RoleMeta[] = [
    { id: 'Everybody', label: 'In this role is everyone' },
    { id: 'Employee', label: '' },
    { id: 'Teamleader', label: '' }
  ];

  export const EXPIRY_ERRORS: ErrorMeta[] = [
    { label: 'ProcurementRequestParallel -> error:task', id: 'f29' },
    { label: 'ProcurementRequestParallel -> error:task:bla', id: 'f31' }
  ];

  const NODE_OF: NodeRef = {
    pid: 'some-pid',
    name: 'Mock Element',
    type: {
      id: 'GenericActivity',
      label: 'Mock Element',
      shortLabel: 'Element',
      description: 'This is a mock element',
      iconId: 'mock icon',
      impl: ''
    }
  };

  export const CONNECTOR_OF: ConnectorRef = {
    pid: '169A4921D0EF0B91-f21',
    name: '',
    source: NODE_OF,
    target: NODE_OF
  };
}
