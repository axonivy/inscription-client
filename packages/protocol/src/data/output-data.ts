import { MappingData } from './common';

export interface OutputData {
  config: {
    output?: MappingData;
    sudo?: boolean;
  };
}
