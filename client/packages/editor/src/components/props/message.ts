export interface Message {
  severity: 'error' | 'warning' | 'info';
  message: string;
}
