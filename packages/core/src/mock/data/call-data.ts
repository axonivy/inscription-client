import { MappingData } from '@axonivy/inscription-protocol';

export interface CallData {
  config: {
    dialog: string;
    call: MappingData;
  };
}
