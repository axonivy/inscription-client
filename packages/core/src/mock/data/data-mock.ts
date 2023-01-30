import { NameData } from '@axonivy/inscription-protocol';

export namespace DataMock {
  export const NAME: NameData = {
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
        map: [{ key: 'param.procurementRequest', value: 'in' }],
        code: 'ivy.log.info("Hello World")'
      },
      task: {
        name: 'user task'
      },
      output: {
        map: [
          { key: 'out.amount', value: '123' },
          { key: 'out.accepted', value: 'true' }
        ]
      }
    }
  };

  export const TASK_SWITCH_GATEWAY = {
    ...NAME,
    config: {
      tasks: [
        { id: 'TaskA', name: 'TaskA' },
        { id: 'TaskB', name: 'TaskB' }
      ]
    }
  };
}
