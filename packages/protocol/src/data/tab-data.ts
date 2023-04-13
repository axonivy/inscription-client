import { Data, ScriptMapCode } from './inscription';

export type NameData = Omit<Data, 'config'>;

export type ProcessCallData = {
  processCall: string;
};

export type DialogCallData = {
  dialog: string;
};

export type MappingData = ScriptMapCode;
export type Mapping = MappingData['map'];

export type CallData = {
  call: MappingData;
};

export interface EndPageData {
  page: string;
}
