import { WfCase, WfCustomField } from './inscription';

export interface CaseData {
  case: WfCase;
}

export const DEFAULT_CASE_DATA: CaseData = {
  case: {
    name: '',
    description: '',
    category: '',
    customFields: [] as WfCustomField[],
    attachToBusinessCase: false
  }
} as const;
