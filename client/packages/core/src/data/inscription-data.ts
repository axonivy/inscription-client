import { CallDataAccess } from './call-data';
import { NameDataAccess } from './name-data';

export type InscriptionType = 'DialogCall' | 'UserTask';

export interface InscriptionData {
  pid: string;
  type: InscriptionType;
  readonly: boolean;
  data: any;
}

export interface InscriptionSaveData {
  pid: string;
  type: InscriptionType;
  data: any;
}

export interface UserTaskData extends NameDataAccess {}

export interface DialogCallData extends NameDataAccess, CallDataAccess {}

export const USER_DIALOG_DATA: DialogCallData = {
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
