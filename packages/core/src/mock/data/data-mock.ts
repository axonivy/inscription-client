import { DEFAULT_TASK, NameData } from '@axonivy/inscription-protocol';
import { deepmerge } from 'deepmerge-ts';

export namespace DataMock {
  export const NAME: NameData = {
    name: 'test name',
    description: 'test desc',
    config: {},
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
        name: 'user task'
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
}
