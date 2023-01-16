import { CallData } from './call-data';
import { NameData } from './name-data';
import { TaskData, TasksData } from './task-data';

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

  export const USER_TASK: NameData | CallData | TaskData = {
    ...NAME,
    config: {
      dialog: '',
      call: {
        map: [{ key: 'param.procurementRequest', value: 'in' }],
        code: 'ivy.log.info("Hello World")'
      },
      task: {
        name: 'user task'
      }
    }
  };

  export const TASK_SWITCH_GATEWAY: NameData | TasksData = {
    ...NAME,
    config: {
      tasks: [
        { id: 'TaskA', name: 'TaskA' },
        { id: 'TaskB', name: 'TaskB' }
      ]
    }
  };
}
