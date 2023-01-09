import { CallData } from './call-data';
import { InscriptionEditorType } from './inscription-type';
import { NameDataAccess } from './name-data';

export interface InscriptionData {
  pid: string;
  type: InscriptionEditorType;
  readonly: boolean;
  data: any;
}

export interface InscriptionSaveData {
  pid: string;
  type: InscriptionEditorType;
  data: any;
}

export interface UserTaskData extends NameDataAccess {}

export interface DialogCallData extends NameDataAccess, CallData {}

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
