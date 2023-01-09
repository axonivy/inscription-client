export type MappingData = {
  map: Mapping[];
  code: string;
};

export interface Mapping {
  key: string;
  value: string;
}

export interface CallData {
  config: {
    dialog: string;
    call: MappingData;
  };
}

export interface CallDataAccess {
  'config/dialog': string;
  'config/call': MappingData;
  'config/call/code': string;
}
