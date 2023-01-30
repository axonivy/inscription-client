export const CUSTOM_FIELD_TYPE = ['String', 'Text', 'Number', 'Timestamp'] as const;

export type CustomFieldType = typeof CUSTOM_FIELD_TYPE[number];

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
