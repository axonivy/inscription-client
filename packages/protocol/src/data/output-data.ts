import { Mapping, MappingData } from './common';

export interface OutputData {
  output: MappingData;
  sudo: boolean;
}

export const DEFAULT_OUTPUT_DATA: OutputData = {
  output: {
    map: [] as Mapping[],
    code: ''
  },
  sudo: false
} as const;
