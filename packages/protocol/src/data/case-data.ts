import { CustomField } from './common';

export interface Case {
  name?: string;
  description?: string;
  category?: string;
  customFields?: CustomField[];
}

export interface CaseData {
  config: {
    case?: Case;
  };
}
