import { CallData } from './call-data';
import { NameData } from './name-data';

export type InscriptionType = 'UserDialog' | 'UserTask';

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

export interface UserTaskData {
  nameData: NameData;
  taskData: any;
  caseData: any;
  callData: CallData;
  outputData: any;
}

export interface UserDialogData {
  nameData: NameData;
  callData: CallData;
  outputData: any;
}

export const USER_DIALOG_DATA: UserDialogData = {
  nameData: {
    displayName: 'test name',
    description: 'test desc',
    documents: [
      {
        description: 'Doc 1',
        url: 'axonivy.com'
      },
      {
        description: 'ivyTeam ❤️',
        url: 'ivyteam.ch'
      }
    ],
    tags: ['bla', 'zag']
  },
  callData: {
    dialogStart: '',
    mappingData: {
      mappings: [{ attribute: 'param.procurementRequest', expression: 'in' }],
      code: 'ivy.log.info("Hello World")'
    }
  },
  outputData: {}
};
