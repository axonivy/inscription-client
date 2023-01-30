import { CustomField } from './common';

export interface Case {
  name: string;
  description: string;
  category: string;
  customFields: CustomField[];
}

export interface CaseData {
  case: Case;
}

export const DEFAULT_CASE_DATA: CaseData = {
  case: {
    name: '',
    description: '',
    category: '',
    customFields: [] as CustomField[]
  }
} as const;
