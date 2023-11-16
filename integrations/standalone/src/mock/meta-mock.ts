import type {
  CallableStart,
  ConnectorRef,
  ErrorStartMeta,
  VariableInfo,
  NodeRef,
  RoleMeta,
  ContentObject,
  DataClass
} from '@axonivy/inscription-protocol';

export namespace MetaMock {
  const USER_INFO_TYPE = [
    {
      attribute: 'email',
      type: 'String',
      simpleType: 'String',
      description: ''
    },
    {
      attribute: 'fullName',
      type: 'String',
      simpleType: 'String',
      description: ''
    },
    {
      attribute: 'role',
      type: 'String',
      simpleType: 'String',
      description: ''
    }
  ];

  const MAP_INFO_TYPES = {
    'workflow.humantask.ProcurementRequest': [
      {
        attribute: 'accepted',
        type: 'Boolean',
        simpleType: 'Boolean',
        description: ''
      },
      {
        attribute: 'activityLog',
        type: 'List<workflow.humantask.LogEntry>',
        simpleType: 'List<LogEntry>',
        description: ''
      },
      {
        attribute: 'amount',
        type: 'Number',
        simpleType: 'Number',
        description: ''
      },
      {
        attribute: 'dataOkManager',
        type: 'Boolean',
        simpleType: 'Boolean',
        description: ''
      },
      {
        attribute: 'dataOkTeamLeader',
        type: 'Boolean',
        simpleType: 'Boolean',
        description: ''
      },
      {
        attribute: 'description',
        type: 'String',
        simpleType: 'String',
        description: ''
      },
      {
        attribute: 'notes',
        type: 'String',
        simpleType: 'String',
        description: ''
      },
      {
        attribute: 'pricePerUnit',
        type: 'Number',
        simpleType: 'Number',
        description: ''
      },
      {
        attribute: 'requester',
        type: 'workflow.humantask.User',
        simpleType: 'User',
        description: ''
      },
      {
        attribute: 'totalPrice',
        type: 'Number',
        simpleType: 'Number',
        description: ''
      }
    ],
    'workflow.humantask.User': USER_INFO_TYPE
  };

  const IN_INFO_TYPES = {
    'mock.Test': [
      {
        attribute: 'bla',
        type: 'Boolean',
        simpleType: 'Boolean',
        description: ''
      },
      {
        attribute: 'user',
        type: 'workflow.humantask.User',
        simpleType: 'User',
        description: ''
      }
    ],
    'workflow.humantask.User': USER_INFO_TYPE
  };

  export const OUT_VAR_INFO: VariableInfo = {
    variables: [
      {
        attribute: 'out',
        type: 'workflow.humantask.ProcurementRequest',
        simpleType: 'ProcurementRequest',
        description: ''
      }
    ],
    types: MAP_INFO_TYPES
  };

  export const CMS_TYPE: ContentObject[] = [
    {
      name: 'Macro',
      fullPath: '/Macro',
      type: 'STRING',
      values: {
        en: '<%=ivy.html.get("in.date")%> <%=ivy.cms.co("/ProcessPages/test/Panel1")%>'
      },
      children: []
    },
    {
      name: 'BlaFile',
      fullPath: '/BlaFile',
      type: 'FILE',
      values: {},
      children: []
    },
    {
      name: 'hallo',
      fullPath: '/hallo',
      type: 'STRING',
      values: {
        en: 'hello'
      },
      children: []
    }
  ];

  export const DATACLASS: DataClass[] = [
    {
      name: 'Person',
      fullQualifiedName: 'ch.ivyteam.test.Person',
      packageName: 'ch.ivyteam.test',
      path: 'dataclasses/ch/ivyteam/test/Person.ivyClass'
    },
    {
      name: 'List',
      packageName: 'java.util',
      fullQualifiedName: 'java.util.List',
      path: 'thisisaTest'
    }
  ];

  export const RESULT_VAR_INFO: VariableInfo = {
    variables: [
      {
        attribute: 'result',
        type: '<>',
        simpleType: '<>',
        description: ''
      }
    ],
    types: {}
  };

  export const IN_VAR_INFO: VariableInfo = {
    variables: [
      {
        attribute: 'in',
        type: 'mock.Test',
        simpleType: 'Test',
        description: ''
      }
    ],
    types: IN_INFO_TYPES
  };

  export const CALLABLE_STARTS: CallableStart[] = [
    {
      id: 'workflow.humantask.AcceptRequest:start(workflow.humantask.ProcurementRequest)',
      process: 'AcceptRequest',
      packageName: 'workflow.humantask',
      description: '',
      startName: 'start(workflow.humantask.ProcurementRequest)',
      project: 'workflow-demos',
      deprecated: false,
      callParameter: {
        variables: [
          {
            attribute: 'param.procurementRequest',
            type: 'workflow.humantask.ProcurementRequest',
            simpleType: 'ProcurementRequest',
            description: 'this is a description'
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
      deprecated: true,
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
      deprecated: false,
      callParameter: {
        variables: [
          {
            attribute: 'param.Endless',
            type: 'demo.Endless',
            simpleType: 'Endless',
            description: ''
          }
        ],
        types: {
          'demo.Endless': [
            {
              attribute: 'endless',
              type: 'demo.Endless',
              simpleType: 'Endless',
              description: ''
            }
          ]
        }
      }
    }
  ];

  export const ROLES: RoleMeta = {
    id: 'Everybody',
    label: 'In this role is everyone',
    children: [
      { id: 'Employee', label: '', children: [] },
      { id: 'Teamleader', label: '', children: [] }
    ]
  };

  export const EXPIRY_ERRORS: ErrorStartMeta[] = [
    { label: 'ProcurementRequestParallel -> error:task', id: 'f29' },
    { label: 'ProcurementRequestParallel -> error:task:bla', id: 'f31' }
  ];

  const NODE_OF: NodeRef = {
    pid: '1',
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

  export const CONNECTORS_OUT: ConnectorRef[] = [
    {
      pid: '169A4921D0EF0B91-f1',
      name: '',
      source: NODE_OF,
      target: NODE_OF
    }
  ];
}
