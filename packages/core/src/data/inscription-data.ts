import { CallData } from './call-data';
import { InscriptionEditorType, InscriptionType } from './inscription-type';
import { NameDataAccess } from './name-data';
import { TaskData } from './task-data';

export interface InscriptionData {
  pid: string;
  type: InscriptionType;
  readonly: boolean;
  data: any;
}

export interface InscriptionSaveData {
  pid: string;
  type: InscriptionEditorType;
  data: any;
}

export const USER_TASK_DATA: NameDataAccess | CallData | TaskData = {
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
