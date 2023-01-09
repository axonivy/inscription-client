export type MessageSeverity = 'error' | 'warning' | 'info';

export interface Message {
  severity: MessageSeverity;
  message: string;
}
