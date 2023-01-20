export enum CustomFieldType {
  STRING = 'String',
  TEXT = 'Text',
  NUMBER = 'Number',
  TIMESTAMP = 'Timestamp'
}

export interface CustomField {
  name: string;
  type: CustomFieldType;
  value: string;
}
