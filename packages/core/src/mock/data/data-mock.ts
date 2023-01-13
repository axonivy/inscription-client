import { CallData } from './call-data';
import { NameData } from './name-data';
import { TaskData } from './task-data';

export namespace DataMock {
  export const USER_TASK: NameData | CallData | TaskData = {
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
    tags: ['bla', 'zag'],
    config: {
      dialog: '',
      call: {
        map: [{ key: 'param.procurementRequest', value: 'in' }],
        code: 'ivy.log.info("Hello World")'
      }
    }
  };
}
