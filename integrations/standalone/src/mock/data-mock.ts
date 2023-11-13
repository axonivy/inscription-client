import type { ElementType, GeneralData } from '@axonivy/inscription-protocol';
import { DEFAULT_TASK } from '@axonivy/inscription-protocol';
import { deepmerge } from 'deepmerge-ts';

export namespace DataMock {
  export const NAME: GeneralData = {
    name: 'test name',
    description: 'test desc',
    docs: [
      {
        name: 'Doc 1',
        url: 'axonivy.com'
      },
      {
        name: 'ivyTeam ❤️',
        url: 'ivyteam.ch'
      }
    ],
    tags: ['bla', 'zag']
  };

  export const USER_TASK = {
    ...NAME,
    config: {
      dialog: '',
      call: {
        map: { 'param.procurementRequest': 'in' },
        code: 'ivy.log.info("Hello World")'
      },
      task: {
        name: 'user task',
        notification: false,
      },
      case: {
        name: 'case <%=ivy.cms.co("/Case/name")%> bla <%= in.name %>',
        description: `<%=ivy.cms.co("/Emails/yourRequestHasBeen")%> 
blalbalba
<%=in.amount%> and <%=in.description%> 
<%=ivy.cms.co("/Dialogs/procurementRequest/forTotal")%> <%=in.totalPrice%> 
<%=ivy.cms.co("/Dialogs/procurementRequest/currencySymbol")%>`
      },
      output: {
        map: {
          'out.amount': '123',
          'out.accepted': 'true'
        }
      }
    }
  };

  export const TASK_SWITCH_GATEWAY = {
    ...NAME,
    config: {
      tasks: [deepmerge(DEFAULT_TASK, { id: 'TaskA', name: 'TaskA' }), deepmerge(DEFAULT_TASK, { id: 'TaskB', name: 'TaskB' })]
    }
  };

  export const ALTERNATIVE = {
    ...NAME,
    config: {
      conditions: {
        f1: 'false',
        f6: ''
      }
    }
  };

  export function mockForType(type: ElementType) {
    switch (type) {
      case 'UserTask':
      case 'DialogCall':
        return DataMock.USER_TASK;
      case 'TaskSwitchGateway':
        return DataMock.TASK_SWITCH_GATEWAY;
      case 'Alternative':
        return DataMock.ALTERNATIVE;
      default:
        return DataMock.NAME;
    }
  }
}
