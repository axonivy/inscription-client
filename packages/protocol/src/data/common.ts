export const CUSTOM_FIELD_TYPE = {
  STRING: 'String',
  TEXT: 'Text',
  NUMBER: 'Number',
  TIMESTAMP: 'Timestamp'
} as const;

export type CustomFieldType = keyof typeof CUSTOM_FIELD_TYPE;

export interface CustomField {
  name: string;
  type: CustomFieldType;
  value: string;
}

export type MappingData = {
  map: Mapping[];
  code: string;
};

export interface Mapping {
  key: string;
  value: string;
}
