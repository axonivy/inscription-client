export const CUSTOM_FIELD_TYPE = ['String', 'Text', 'Number', 'Timestamp'] as const;

export type CustomFieldType = typeof CUSTOM_FIELD_TYPE[number];

export interface CustomField {
  name: string;
  type: CustomFieldType;
  value: string;
}
