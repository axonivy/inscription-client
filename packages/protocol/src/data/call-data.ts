export type MappingData = {
  map: Mapping[];
  code: string;
};

export interface Mapping {
  key: string;
  value: string;
}

export interface CallDataAccess {
  'config/dialog': string;
  'config/call': MappingData;
  'config/call/code': string;
}
