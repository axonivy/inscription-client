import { CustomField } from '@axonivy/inscription-protocol';

export interface TaskData {
  config: {
    persist: boolean;
    task: {
      name: string;
      description: string;
      category: string;
      priority: string;
      expiry: {
        timeout: string;
        error: string;
        responsible: {
          role?: string;
          user?: string;
        };
        priority: string;
      };
      customFields: CustomField[];
      code: string;
    };
  };
}
