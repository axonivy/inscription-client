export interface InscriptionValidation {
  path: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
}
