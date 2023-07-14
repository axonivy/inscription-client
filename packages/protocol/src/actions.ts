export type CustomFieldType = 'START' | 'TASK' | 'CASE';

export interface InscriptionActionHandlers {
  newHtmlDialog: undefined;
  newProcess: undefined;
  openPage: string;
  openCustomField: `${CustomFieldType},${string}`;
  openDoc: string;
}
