export const CUSTOM_FIELD_TYPE = {
  STRING: 'String',
  TEXT: 'Text',
  NUMBER: 'Number',
  TIMESTAMP: 'Timestamp'
} as const;

export type MappingData = {
  map: Mapping;
  code: string;
};

export type Mapping = Record<string, string>;
