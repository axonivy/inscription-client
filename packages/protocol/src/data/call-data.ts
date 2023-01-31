import { Mapping, MappingData } from './common';

export type CallData = {
  dialog: string;
  call: MappingData;
};

export const DEFAULT_CALL_DATA: CallData = {
  dialog: '',
  call: {
    map: [] as Mapping[],
    code: ''
  }
} as const;
