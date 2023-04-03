import { MappingData } from './common';

export type ProcessCallData = {
  processCall: string;
};

export type DialogCallData = {
  dialog: string;
};

export type CallData = {
  call: MappingData;
};

export const DEFAULT_CALL_DATA: CallData & DialogCallData & ProcessCallData = {
  dialog: '',
  processCall: '',
  call: {
    map: {},
    code: ''
  }
} as const;
