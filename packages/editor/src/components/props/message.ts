import { Severity } from '@axonivy/inscription-protocol';

export interface Message {
  severity: Severity;
  message: string;
}
