export interface CallData {
  dialogStart: string;
  mappingData: MappingData;
}

export type MappingData = {
  mappings: Mapping[];
  code: string;
};

export interface Mapping {
  attribute: string;
  expression: string;
}

export interface CallDataAccess {
  callData: CallData;
  'callData/dialogStart': string;
  'callData/mappingData': MappingData;
  'callData/mappingData/code': string;
}
